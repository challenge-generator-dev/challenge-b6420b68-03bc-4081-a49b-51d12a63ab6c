// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { IsString, IsDateString, IsNotEmpty, validateSync } from 'class-validator';

export interface Reservation {
  id: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
}

export class ReservationModel {
  private readonly _id: string;
  private readonly _roomId: string;
  private readonly _startTime: Date;
  private readonly _endTime: Date;

  constructor(data: Reservation) {
    this.validateInvariant(data);
    this._id = data.id;
    this._roomId = data.roomId;
    this._startTime = new Date(data.startTime);
    this._endTime = new Date(data.endTime);
  }

  get id(): string {
    return this._id;
  }

  get roomId(): string {
    return this._roomId;
  }

  get startTime(): Date {
    return this._startTime;
  }

  get endTime(): Date {
    return this._endTime;
  }

  private validateInvariant(data: Reservation): void {
    throw new Error('TODO(reto): validateInvariant');
  }

  overlaps(other: ReservationModel): boolean {
    throw new Error('TODO(reto): overlaps');
  }

  toPlain(): Reservation {
    throw new Error('TODO(reto): toPlain');
  }

  static fromPlain(data: Reservation): ReservationModel {
    throw new Error('TODO(reto): fromPlain');
  }
}

export class ReservationCreateDto {
  @IsString()
  @IsNotEmpty()
  roomId!: string;

  @IsDateString()
  @IsNotEmpty()
  startTime!: string;

  @IsDateString()
  @IsNotEmpty()
  endTime!: string;
}

export class ReservationResponseDto {
  id: string;
  roomId: string;
  startTime: string;
  endTime: string;

  constructor(reservation: ReservationModel) {
    this.id = reservation.id;
    this.roomId = reservation.roomId;
    this.startTime = reservation.startTime.toISOString();
    this.endTime = reservation.endTime.toISOString();
  }
}