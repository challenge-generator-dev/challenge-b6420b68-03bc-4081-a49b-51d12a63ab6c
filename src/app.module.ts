import { Module } from '@nestjs/common';
import { ReservationController } from './infrastructure/controllers/reservation.controller';
import { ReservationService } from './application/services/reservation.service';
import { ReservationRepositoryImpl } from './infrastructure/repositories/reservation.repository';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepositoryImpl,
  ],
})
export class AppModule {}