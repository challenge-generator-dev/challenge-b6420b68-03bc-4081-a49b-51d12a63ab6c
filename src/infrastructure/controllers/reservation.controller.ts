// TODO(reto): archivo stubbeado; implementa los cuerpos.
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ReservationService } from '../../application/services/reservation.service';
import { ReservationModel, ReservationCreateDto, ReservationResponseDto } from '../../domain/models/reservation.model';

@ApiTags('Reservations')
@Controller('rooms')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':roomId/reservations')
  @ApiOperation({ summary: 'Listar reservas de una sala', description: 'Obtiene todas las reservas de una sala específica' })
  @ApiParam({ name: 'roomId', description: 'ID de la sala', type: String })
  @ApiResponse({ status: 200, description: 'Lista de reservas obtenida exitosamente', type: [ReservationResponseDto] })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  async getReservationsByRoom(@Param('roomId') roomId: string): Promise<ReservationResponseDto[]> {
    throw new Error('TODO(reto): getReservationsByRoom');
  }

  @Post('reservations')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva reserva', description: 'Crea una reserva de sala con validación de solapamientos' })
  @ApiBody({ type: ReservationCreateDto })
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente', type: ReservationResponseDto })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 409, description: 'La reserva se solapa con otra existente' })
  async createReservation(@Body() createDto: ReservationCreateDto): Promise<ReservationResponseDto> {
    throw new Error('TODO(reto): createReservation');
  }

  private validateCreateDto(dto: ReservationCreateDto): void {
    throw new Error('TODO(reto): validateCreateDto');
  }

  private generateId(): string {
    throw new Error('TODO(reto): generateId');
  }
}