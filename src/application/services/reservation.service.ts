// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReservationRepositoryPort } from '../../domain/ports/reservation.repository.port';
import { Reservation, ReservationModel, ReservationCreateDto } from '../../domain/models/reservation.model';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepositoryPort) {}

  async validateOverlap(reservation: Reservation): Promise<boolean> {
    throw new Error('TODO(reto): validateOverlap');
  }

  async createReservation(dto: ReservationCreateDto): Promise<Reservation> {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    const reservation: Reservation = {
      id: crypto.randomUUID(),
      roomId: dto.roomId,
      startTime,
      endTime,
    };

    await this.validateOverlap(reservation);

    return this.reservationRepository.save(reservation);
  }

  async getReservationsByRoom(roomId: string): Promise<Reservation[]> {
    if (!roomId || roomId.trim() === '') {
      throw new BadRequestException('El roomId es obligatorio');
    }

    return this.reservationRepository.findByRoomId(roomId);
  }
}