import { Reservation } from '../models/reservation.model';

export interface ReservationRepositoryPort {
  findByRoomAndTime(roomId: string, startTime: Date, endTime: Date): Promise<Reservation[]>;
  findByRoomId(roomId: string): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<Reservation>;
}