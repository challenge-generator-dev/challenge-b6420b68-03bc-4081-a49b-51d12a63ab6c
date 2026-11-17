import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../../infrastructure/controllers/reservation.controller';
import { ReservationService } from '../../application/services/reservation.service';
import { ReservationRepositoryPort } from '../../domain/ports/reservation.repository.port';
import { Reservation, ReservationCreateDto, ReservationResponseDto } from '../../domain/models/reservation.model';

describe('ReservationController (Integration)', () => {
  let controller: ReservationController;
  let service: ReservationService;
  let mockRepository: jest.Mocked<ReservationRepositoryPort>;

  beforeEach(async () => {
    mockRepository = {
      findByRoomAndTime: jest.fn(),
      findByRoomId: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    } as any;

    service = new ReservationService(mockRepository);
    controller = new ReservationController(service);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        {
          provide: 'ReservationRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  describe('GET /reservations/room/:roomId', () => {
    it('debe retornar lista de reservas para una sala existente', async () => {
      const roomId = 'room-1';
      const reservations: Reservation[] = [
        {
          id: 'res-1',
          roomId,
          startTime: new Date('2024-01-15T10:00:00Z'),
          endTime: new Date('2024-01-15T11:00:00Z'),
        },
        {
          id: 'res-2',
          roomId,
          startTime: new Date('2024-01-15T14:00:00Z'),
          endTime: new Date('2024-01-15T15:00:00Z'),
        },
      ];

      mockRepository.findByRoomId.mockResolvedValue(reservations);

      const result = await controller.getReservationsByRoom(roomId);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('res-1');
      expect(result[1].id).toBe('res-2');
      expect(mockRepository.findByRoomId).toHaveBeenCalledWith(roomId);
    });

    it('debe retornar lista vacia cuando no hay reservas', async () => {
      const roomId = 'room-1';
      mockRepository.findByRoomId.mockResolvedValue([]);

      const result = await controller.getReservationsByRoom(roomId);

      expect(result).toHaveLength(0);
    });
  });

  describe('POST /reservations', () => {
    it('debe crear una reserva exitosamente cuando no hay solapamientos', async () => {
      const createDto: ReservationCreateDto = {
        roomId: 'room-1',
        startTime: '2024-01-15T10:00:00',
        endTime: '2024-01-15T11:00:00',
      };

      const savedReservation: Reservation = {
        id: 'res-new',
        roomId: createDto.roomId,
        startTime: new Date(createDto.startTime),
        endTime: new Date(createDto.endTime),
      };

      mockRepository.findByRoomAndTime.mockResolvedValue([]);
      mockRepository.save.mockResolvedValue(savedReservation);

      const result = await controller.createReservation(createDto);

      expect(result.id).toBe('res-new');
      expect(result.roomId).toBe(createDto.roomId);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('debe rechazar una reserva cuando hay solapamiento', async () => {
      const createDto: ReservationCreateDto = {
        roomId: 'room-1',
        startTime: '2024-01-15T10:00:00',
        endTime: '2024-01-15T11:00:00',
      };

      const existingReservation: Reservation = {
        id: 'res-existing',
        roomId: createDto.roomId,
        startTime: new Date('2024-01-15T10:30:00'),
        endTime: new Date('2024-01-15T11:30:00'),
      };

      mockRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

      await expect(controller.createReservation(createDto)).rejects.toThrow();
    });

    it('debe rechazar una reserva con sala inexistente', async () => {
      const createDto: ReservationCreateDto = {
        roomId: '',
        startTime: '2024-01-15T10:00:00',
        endTime: '2024-01-15T11:00:00',
      };

      await expect(controller.createReservation(createDto)).rejects.toThrow();
    });

    it('debe rechazar una reserva con fechas mal formateadas', async () => {
      const createDto: ReservationCreateDto = {
        roomId: 'room-1',
        startTime: 'invalid-date',
        endTime: '2024-01-15T11:00:00',
      };

      await expect(controller.createReservation(createDto)).rejects.toThrow();
    });

    it('debe rechazar una reserva donde endTime es anterior a startTime', async () => {
      const createDto: ReservationCreateDto = {
        roomId: 'room-1',
        startTime: '2024-01-15T12:00:00',
        endTime: '2024-01-15T10:00:00',
      };

      await expect(controller.createReservation(createDto)).rejects.toThrow();
    });
  });
});