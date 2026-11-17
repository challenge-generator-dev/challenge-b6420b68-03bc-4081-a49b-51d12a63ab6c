// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReservationRepositoryPort } from '../../domain/ports/reservation.repository.port';
import { Reservation } from '../../domain/models/reservation.model';

export interface DatabaseClient {
  query(sql: string, params?: any[]): Promise<any>;
}

@Injectable()
export class ReservationRepositoryImpl implements ReservationRepositoryPort {
  constructor(private readonly databaseClient: DatabaseClient) {}

  async findByRoomAndTime(roomId: string, startTime: Date, endTime: Date): Promise<Reservation[]> {
    throw new Error('TODO(reto): findByRoomAndTime');
  }

  async findByRoomId(roomId: string): Promise<Reservation[]> {
    throw new Error('TODO(reto): findByRoomId');
  }

  async findById(id: string): Promise<Reservation | null> {
    throw new Error('TODO(reto): findById');
  }

  async save(reservation: Reservation): Promise<Reservation> {
    throw new Error('TODO(reto): save');
  }
}