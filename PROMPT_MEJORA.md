# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/domain/models/reservation.model.ts` — La pieza p1 (Modelado de datos para reservas, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/infrastructure/controllers/reservation.controller.ts` — La pieza p2 (Definición de endpoints REST, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/application/services/reservation.service.ts` — La pieza p3 (Validación de solapamientos de reservas, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/infrastructure/repositories/reservation.repository.ts` — La pieza p4 (Acceso a datos para reservas, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Como saber que terminaste

```bash
npm install --no-audit --no-fund && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construye una API REST de reservas de salas de reunion con validacion de solapamientos

### Reto
- Tema: API de reservas de salas
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para reservas de salas de reunión
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de endpoints y modelo de datos — objetivo: Definir los endpoints necesarios y el modelo de datos para las reservas de salas. — entregable (NO resolver): Documentación de los endpoints y modelo de datos.
- Fase 2: Implementación de la lógica de negocio — objetivo: Implementar la lógica de negocio para la validación de solapamientos de reservas. — entregable (NO resolver): Código implementado para la lógica de negocio de validación de solapamientos.
- Fase 3: Pruebas y optimización — objetivo: Realizar pruebas unitarias y de integración, y optimizar la API. — entregable (NO resolver): Código de pruebas unitarias y de integración, y optimizaciones aplicadas a la API.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/swagger": "8.1.1",
    "@nestjs/testing": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "pg": "8.23.1",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: src/infrastructure/config/validation.pipe.ts ===
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class ValidationError extends Error {
  constructor(
    public readonly property: string,
    public readonly constraints: Record<string, string>
  ) {
    super(`Validation failed on property: ${property}`);
    this.name = 'ValidationError';
  }
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const validationErrors: ValidationError[] = errors.map(error => 
        new ValidationError(error.property, error.constraints || {})
      );
      
      const errorInfo = validationErrors.map(err => ({
        property: err.property,
        constraints: err.constraints
      }));
      
      return { validationErrors: errorInfo, isValid: false };
    }

    return { ...value, isValid: true };
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

// === ARCHIVO: src/domain/models/reservation.model.ts ===
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

// === ARCHIVO: src/infrastructure/controllers/reservation.controller.ts ===
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

// === ARCHIVO: src/application/services/reservation.service.ts ===
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

// === ARCHIVO: src/infrastructure/repositories/reservation.repository.ts ===
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

// === ARCHIVO: src/acceptance/f1.test.ts ===
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

// === ARCHIVO: src/domain/ports/reservation.repository.port.ts ===
import { Reservation } from '../models/reservation.model';

export interface ReservationRepositoryPort {
  findByRoomAndTime(roomId: string, startTime: Date, endTime: Date): Promise<Reservation[]>;
  findByRoomId(roomId: string): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<Reservation>;
}

// === ARCHIVO: src/acceptance/f2.test.ts ===
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

// === ARCHIVO: src/test/unit/reservation.service.spec.ts ===
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

// === ARCHIVO: src/test/integration/reservation.controller.spec.ts ===
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

// === ARCHIVO: src/main.ts ===
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './infrastructure/config/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();

// === ARCHIVO: src/app.module.ts ===
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
```
