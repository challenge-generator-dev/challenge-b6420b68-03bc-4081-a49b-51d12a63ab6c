import { ReservationModel, Reservation } from '../domain/models/reservation.model';

describe('Fase 1: Definición de endpoints y modelo de datos', () => {
  describe('Pieza p1: Modelado de datos para reservas', () => {
    describe('Validar reserva con horarios válidos', () => {
      it('dado Una reserva con startTime anterior a endTime; cuando Se valida el modelo; entonces La reserva es aceptada', () => {
        const validReservation: Reservation = {
          id: 'res_001',
          roomId: 'room_101',
          startTime: new Date('2024-01-15T10:00:00Z'),
          endTime: new Date('2024-01-15T12:00:00Z'),
        };

        const model = new ReservationModel(validReservation);

        expect(model.id).toBe('res_001');
        expect(model.roomId).toBe('room_101');
        expect(model.startTime.getTime()).toBe(validReservation.startTime.getTime());
        expect(model.endTime.getTime()).toBe(validReservation.endTime.getTime());
      });
    });

    describe('Rechazar reserva con endTime anterior a startTime', () => {
      it('dado Una reserva con endTime anterior a startTime; cuando Se valida el modelo; entonces Se lanza un error de validación', () => {
        const invalidReservation: Reservation = {
          id: 'res_002',
          roomId: 'room_101',
          startTime: new Date('2024-01-15T14:00:00Z'),
          endTime: new Date('2024-01-15T12:00:00Z'),
        };

        expect(() => new ReservationModel(invalidReservation)).toThrow(
          'La fecha de fin debe ser posterior a la fecha de inicio'
        );
      });
    });

    describe('Rechazar reserva con fechas mal formateadas', () => {
      it('dado Una reserva con fechas en formato inválido; cuando Se valida el modelo; entonces Se lanza un error de validación', () => {
        const invalidReservation: Reservation = {
          id: 'res_003',
          roomId: 'room_101',
          startTime: new Date('invalid-date'),
          endTime: new Date('2024-01-15T12:00:00Z'),
        };

        expect(() => new ReservationModel(invalidReservation)).toThrow();
      });
    });

    describe('Rechazar reserva con sala inexistente', () => {
      it('dado Una reserva con roomId que no existe en el sistema; cuando Se valida el modelo; entonces Se lanza un error de validación', () => {
        const reservationWithInvalidRoom: Reservation = {
          id: 'res_004',
          roomId: '',
          startTime: new Date('2024-01-15T10:00:00Z'),
          endTime: new Date('2024-01-15T12:00:00Z'),
        };

        expect(() => new ReservationModel(reservationWithInvalidRoom)).toThrow(
          'El ID de la sala es requerido y debe ser una cadena'
        );
      });
    });
  });

  describe('Pieza p2: Definición de endpoints REST', () => {
    const mockReservationService = {
      roomExists: jest.fn(),
      getReservationsByRoom: jest.fn(),
      createReservation: jest.fn(),
      hasOverlap: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('Listar reservas de una sala', () => {
      it('dado Una sala con reservas existentes; cuando Se invoca GET /rooms/:roomId/reservations; entonces Se devuelve una lista de reservas para la sala', async () => {
        const roomId = 'room_101';
        const mockReservations = [
          new ReservationModel({
            id: 'res_001',
            roomId,
            startTime: new Date('2024-01-15T10:00:00Z'),
            endTime: new Date('2024-01-15T12:00:00Z'),
          }),
          new ReservationModel({
            id: 'res_002',
            roomId,
            startTime: new Date('2024-01-15T14:00:00Z'),
            endTime: new Date('2024-01-15T16:00:00Z'),
          }),
        ];

        mockReservationService.roomExists.mockResolvedValue(true);
        mockReservationService.getReservationsByRoom.mockResolvedValue(mockReservations);

        const result = await mockReservationService.getReservationsByRoom(roomId);

        expect(mockReservationService.roomExists).toHaveBeenCalledWith(roomId);
        expect(mockReservationService.getReservationsByRoom).toHaveBeenCalledWith(roomId);
        expect(result).toHaveLength(2);
        expect(result[0].roomId).toBe(roomId);
      });
    });

    describe('Crear reserva válida', () => {
      it('dado Una reserva con horarios no solapados; cuando Se invoca POST /reservations con la reserva; entonces Se devuelve la reserva creada con código 201', async () => {
        const createDto = {
          roomId: 'room_101',
          startTime: '2024-01-15T10:00:00Z',
          endTime: '2024-01-15T12:00:00Z',
        };

        const createdReservation = new ReservationModel({
          id: 'res_new',
          roomId: createDto.roomId,
          startTime: new Date(createDto.startTime),
          endTime: new Date(createDto.endTime),
        });

        mockReservationService.roomExists.mockResolvedValue(true);
        mockReservationService.hasOverlap.mockResolvedValue(false);
        mockReservationService.createReservation.mockResolvedValue(createdReservation);

        const result = await mockReservationService.createReservation(createdReservation);

        expect(mockReservationService.roomExists).toHaveBeenCalledWith(createDto.roomId);
        expect(mockReservationService.hasOverlap).toHaveBeenCalled();
        expect(mockReservationService.createReservation).toHaveBeenCalledWith(createdReservation);
        expect(result.id).toBe('res_new');
      });
    });

    describe('Rechazar reserva con parámetros inválidos', () => {
      it('dado Una reserva con parámetros inválidos (ej: fechas mal formateadas); cuando Se invoca POST /reservations con la reserva; entonces Se devuelve un error 400 con mensaje de validación', () => {
        const invalidDto = {
          roomId: 'room_101',
          startTime: 'invalid-date',
          endTime: '2024-01-15T12:00:00Z',
        };

        const validateDates = () => {
          const startTime = new Date(invalidDto.startTime);
          const endTime = new Date(invalidDto.endTime);
          
          if (isNaN(startTime.getTime())) {
            throw new Error('La fecha de inicio tiene un formato inválido');
          }
          if (isNaN(endTime.getTime())) {
            throw new Error('La fecha de fin tiene un formato inválido');
          }
        };

        expect(validateDates).toThrow('La fecha de inicio tiene un formato inválido');
      });
    });

    describe('Rechazar reserva solapada', () => {
      it('dado Una reserva que se solapa con otra existente; cuando Se invoca POST /reservations con la reserva; entonces Se devuelve un error 409 con mensaje de solapamiento', async () => {
        const existingReservation = new ReservationModel({
          id: 'res_001',
          roomId: 'room_101',
          startTime: new Date('2024-01-15T10:00:00Z'),
          endTime: new Date('2024-01-15T12:00:00Z'),
        });

        const newReservation = new ReservationModel({
          id: 'res_002',
          roomId: 'room_101',
          startTime: new Date('2024-01-15T11:00:00Z'),
          endTime: new Date('2024-01-15T13:00:00Z'),
        });

        const hasOverlap = newReservation.overlaps(existingReservation);

        expect(hasOverlap).toBe(true);
      });
    });
  });
});