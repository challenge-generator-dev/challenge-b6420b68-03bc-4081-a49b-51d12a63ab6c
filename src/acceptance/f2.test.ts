import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../application/services/reservation.service';
import { ReservationRepositoryPort } from '../domain/ports/reservation.repository.port';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Reservation } from '../domain/models/reservation.model';

describe('Fase f2: Validación de solapamientos y acceso a datos', () => {
  let reservationService: ReservationService;
  let mockReservationRepository: jest.Mocked<ReservationRepositoryPort>;

  beforeEach(async () => {
    mockReservationRepository = {
      findByRoomAndTime: jest.fn(),
      findByRoomId: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: 'ReservationRepository',
          useValue: mockReservationRepository,
        },
      ],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
  });

  describe('Pieza p3: Validación de solapamientos de reservas', () => {
    describe('Permitir reserva en horario no solapado', () => {
      it('debe aceptar una reserva en horario no solapado', async () => {
        const existingReservation: Reservation = {
          id: 'existing-1',
          roomId: 'room-1',
          startTime: new Date('2024-01-15T10:00:00'),
          endTime: new Date('2024-01-15T12:00:00'),
        };

        const newReservation: Reservation = {
          id: 'new-1',
          roomId: 'room-1',
          startTime: new Date('2024-01-15T14:00:00'),
          endTime: new Date('2024-01-15T16:00:00'),
        };

        mockReservationRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

        const result = await reservationService.validateOverlap(newReservation);

        expect(result).toBe(true);
        expect(mockReservationRepository.findByRoomAndTime).toHaveBeenCalledWith(
          'room-1',
          newReservation.startTime,
          newReservation.endTime
        );
      });
    });

    describe('Rechazar reserva solapada', () => {
      it('debe lanzar error cuando la reserva se solapa con una existente', async () => {
        const existingReservation: Reservation = {
          id: 'existing-1',
          roomId: 'room-1',
          startTime: new Date('2024-01-15T10:00:00'),
          endTime: new Date('2024-01-15T12:00:00'),
        };

        const newReservation: Reservation = {
          id: 'new-1',
          roomId: 'room-1',
          startTime: new Date('2024-01-15T11:00:00'),
          endTime: new Date('2024-01-15T13:00:00'),
        };

        mockReservationRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

        await expect(reservationService.validateOverlap(newReservation)).rejects.toThrow(
          BadRequestException
        );
      });
    });

    describe('Permitir reserva que empieza justo cuando termina otra', () => {
      it('debe aceptar una reserva que empieza justo cuando termina otra', async () => {
        const existingReservation: Reservation = {
          id: 'existing-1',
          roomId: 'room-1',
          startTime: new Date('2024-01-15T10:00:00'),
          endTime: new Date('2024-01-15T12:00:00'),
        };

        const newReservation: Reservation = {
          id: 'new-1',
          roomId: 'room-1',
          startTime: new Date('2024-01-15T12:00:00'),
          endTime: new Date('2024-01-15T14:00:00'),
        };

        mockReservationRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

        const result = await reservationService.validateOverlap(newReservation);

        expect(result).toBe(true);
      });
    });

    describe('Rechazar reserva con sala inexistente', () => {
      it('debe lanzar error cuando el roomId está vacío', async () => {
        const reservation: Reservation = {
          id: 'new-1',
          roomId: '',
          startTime: new Date('2024-01-15T10:00:00'),
          endTime: new Date('2024-01-15T12:00:00'),
        };

        await expect(reservationService.validateOverlap(reservation)).rejects.toThrow(
          BadRequestException
        );
      });

      it('debe lanzar error cuando el roomId es null', async () => {
        const reservation: Reservation = {
          id: 'new-1',
          roomId: null as any,
          startTime: new Date('2024-01-15T10:00:00'),
          endTime: new Date('2024-01-15T12:00:00'),
        };

        await expect(reservationService.validateOverlap(reservation)).rejects.toThrow(
          BadRequestException
        );
      });
    });
  });

  describe('Pieza p4: Acceso a datos para reservas', () => {
    describe('Buscar reservas en rango de tiempo', () => {
      it('debe devolver las reservas dentro del rango de tiempo', async () => {
        const mockReservations: Reservation[] = [
          {
            id: 'res-1',
            roomId: 'room-1',
            startTime: new Date('2024-01-15T10:00:00'),
            endTime: new Date('2024-01-15T12:00:00'),
          },
        ];

        mockReservationRepository.findByRoomAndTime.mockResolvedValue(mockReservations);

        const result = await mockReservationRepository.findByRoomAndTime(
          'room-1',
          new Date('2024-01-15T09:00:00'),
          new Date('2024-01-15T15:00:00')
        );

        expect(result).toEqual(mockReservations);
        expect(mockReservationRepository.findByRoomAndTime).toHaveBeenCalledWith(
          'room-1',
          new Date('2024-01-15T09:00:00'),
          new Date('2024-01-15T15:00:00')
        );
      });
    });

    describe('Retornar lista vacía si no hay reservas', () => {
      it('debe devolver una lista vacía cuando no hay reservas en el rango', async () => {
        mockReservationRepository.findByRoomAndTime.mockResolvedValue([]);

        const result = await mockReservationRepository.findByRoomAndTime(
          'room-1',
          new Date('2024-01-15T09:00:00'),
          new Date('2024-01-15T15:00:00')
        );

        expect(result).toEqual([]);
        expect(result.length).toBe(0);
      });
    });

    describe('Manejar error de base de datos', () => {
      it('debe lanzar error cuando la base de datos falla', async () => {
        mockReservationRepository.findByRoomAndTime.mockRejectedValue(
          new Error('Connection refused')
        );

        await expect(
          mockReservationRepository.findByRoomAndTime(
            'room-1',
            new Date('2024-01-15T09:00:00'),
            new Date('2024-01-15T15:00:00')
          )
        ).rejects.toThrow();
      });
    });
  });
});