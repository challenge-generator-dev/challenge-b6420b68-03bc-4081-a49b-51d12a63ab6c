import { ReservationService } from '../../application/services/reservation.service';
import { ReservationRepositoryPort } from '../../domain/ports/reservation.repository.port';
import { Reservation, ReservationModel } from '../../domain/models/reservation.model';

describe('ReservationService', () => {
  let service: ReservationService;
  let mockRepository: jest.Mocked<ReservationRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      findByRoomAndTime: jest.fn(),
      findByRoomId: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    } as any;

    service = new ReservationService(mockRepository);
  });

  describe('validateOverlap', () => {
    const roomId = 'room-1';
    const baseReservation: Reservation = {
      id: 'res-1',
      roomId,
      startTime: new Date('2024-01-15T10:00:00Z'),
      endTime: new Date('2024-01-15T11:00:00Z'),
    };

    it('debe retornar false cuando no hay reservas solapadas', async () => {
      mockRepository.findByRoomAndTime.mockResolvedValue([]);

      const result = await service.validateOverlap(baseReservation);

      expect(result).toBe(false);
      expect(mockRepository.findByRoomAndTime).toHaveBeenCalledWith(
        roomId,
        baseReservation.startTime,
        baseReservation.endTime,
      );
    });

    it('debe retornar true cuando existe una reserva que se solapa completamente', async () => {
      const existingReservation: Reservation = {
        id: 'res-2',
        roomId,
        startTime: new Date('2024-01-15T10:30:00Z'),
        endTime: new Date('2024-01-15T11:30:00Z'),
      };
      mockRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

      const result = await service.validateOverlap(baseReservation);

      expect(result).toBe(true);
    });

    it('debe retornar true cuando la nueva reserva comienza durante una existente', async () => {
      const existingReservation: Reservation = {
        id: 'res-2',
        roomId,
        startTime: new Date('2024-01-15T09:00:00Z'),
        endTime: new Date('2024-01-15T10:30:00Z'),
      };
      mockRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

      const result = await service.validateOverlap(baseReservation);

      expect(result).toBe(true);
    });

    it('debe retornar true cuando la nueva reserva termina durante una existente', async () => {
      const existingReservation: Reservation = {
        id: 'res-2',
        roomId,
        startTime: new Date('2024-01-15T10:30:00Z'),
        endTime: new Date('2024-01-15T12:00:00Z'),
      };
      mockRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

      const result = await service.validateOverlap(baseReservation);

      expect(result).toBe(true);
    });

    it('debe retornar false cuando la nueva reserva empieza justo cuando termina otra', async () => {
      const existingReservation: Reservation = {
        id: 'res-2',
        roomId,
        startTime: new Date('2024-01-15T11:00:00Z'),
        endTime: new Date('2024-01-15T12:00:00Z'),
      };
      mockRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

      const result = await service.validateOverlap(baseReservation);

      expect(result).toBe(false);
    });

    it('debe retornar false cuando la nueva reserva termina justo cuando empieza otra', async () => {
      const existingReservation: Reservation = {
        id: 'res-2',
        roomId,
        startTime: new Date('2024-01-15T09:00:00Z'),
        endTime: new Date('2024-01-15T10:00:00Z'),
      };
      mockRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

      const result = await service.validateOverlap(baseReservation);

      expect(result).toBe(false);
    });

    it('debe retornar false cuando la nueva reserva contiene completamente a otra', async () => {
      const existingReservation: Reservation = {
        id: 'res-2',
        roomId,
        startTime: new Date('2024-01-15T10:15:00Z'),
        endTime: new Date('2024-01-15T10:45:00Z'),
      };
      mockRepository.findByRoomAndTime.mockResolvedValue([existingReservation]);

      const result = await service.validateOverlap(baseReservation);

      expect(result).toBe(true);
    });

    it('debe manejar errores de base de datos correctamente', async () => {
      mockRepository.findByRoomAndTime.mockRejectedValue(new Error('Database error'));

      await expect(service.validateOverlap(baseReservation)).rejects.toThrow('Database error');
    });
  });
});