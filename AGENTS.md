# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de API REST para reservas de salas de reunión**.

| | |
|---|---|
| Tema | API de reservas de salas |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | hexagonal/clean |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 10.4.22
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- @nestjs/swagger 8.1.1
- @nestjs/testing 10.4.22
- class-transformer 0.5.1
- class-validator 0.15.1
- pg 8.23.1
- reflect-metadata 0.2.2
- rxjs 7.8.2
- @types/express 4.17.25
- @types/node 22.20.5
- typescript 5.7.3
- jest 29.7.0
- ts-jest 29.2.5
- @types/jest 29.5.14

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install --no-audit --no-fund && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install --no-audit --no-fund && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Definición de endpoints y modelo de datos**: Documentación de los endpoints y modelo de datos.
- **Fase 2 — Implementación de la lógica de negocio**: Código implementado para la lógica de negocio de validación de solapamientos.
- **Fase 3 — Pruebas y optimización**: Código de pruebas unitarias y de integración, y optimizaciones aplicadas a la API.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/domain/models/reservation.model.ts` — La pieza p1 (Modelado de datos para reservas, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/infrastructure/controllers/reservation.controller.ts` — La pieza p2 (Definición de endpoints REST, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/application/services/reservation.service.ts` — La pieza p3 (Validación de solapamientos de reservas, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/infrastructure/repositories/reservation.repository.ts` — La pieza p4 (Acceso a datos para reservas, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Definición de endpoints y modelo de datos | Definición de contratos REST con OpenAPI/Swagger | `src/domain/models/reservation.model.ts:ReservationApiSpec` | Los endpoints están documentados con sus métodos HTTP, paths, parámetros y respuestas esperadas.; El modelo de datos incluye entidades para salas y reservas con sus atributos obligatorios.; Se definen casos de error para entradas inválidas (ej: fechas en pasado, salas inexistentes).; La documentación incluye ejemplos de requests y responses para casos exitosos y de error. | `src/acceptance/f1.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f1 — Definición de endpoints y modelo de datos | Mapeo de errores de negocio a respuestas HTTP | `src/infrastructure/controllers/reservation.controller.ts:ReservationErrorMapper` | Los endpoints están documentados con sus métodos HTTP, paths, parámetros y respuestas esperadas.; El modelo de datos incluye entidades para salas y reservas con sus atributos obligatorios.; Se definen casos de error para entradas inválidas (ej: fechas en pasado, salas inexistentes).; La documentación incluye ejemplos de requests y responses para casos exitosos y de error. | `src/acceptance/f1.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f2 — Implementación de la lógica de negocio | Validación de solapamientos de reservas | `src/application/services/reservation.service.ts:ReservationService.validateOverlap` | La lógica de validación de solapamientos rechaza reservas que se superponen con reservas existentes.; Se manejan casos borde como reservas en el mismo horario pero diferente sala.; Se implementan validaciones adicionales (ej: fechas en pasado, duración mínima).; Los errores de negocio se mapean a respuestas HTTP adecuadas. | `src/acceptance/f2.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Implementación de la lógica de negocio | Consulta eficiente de reservas por rango de tiempo | `src/infrastructure/repositories/reservation.repository.ts:ReservationRepositoryImpl.findByTimeRange` | La lógica de validación de solapamientos rechaza reservas que se superponen con reservas existentes.; Se manejan casos borde como reservas en el mismo horario pero diferente sala.; Se implementan validaciones adicionales (ej: fechas en pasado, duración mínima).; Los errores de negocio se mapean a respuestas HTTP adecuadas. | `src/acceptance/f2.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f3 — Pruebas y optimización | Implementación de endpoints REST para reservas | — | Las pruebas unitarias cubren todos los casos de aceptación de la lógica de negocio.; Las pruebas de integración verifican el comportamiento de los endpoints para casos exitosos y de error.; El repositorio de reservas está optimizado para consultas frecuentes de solapamientos. | — | — |
| f3 — Pruebas y optimización | Optimización de consultas a la base de datos | — | Las pruebas unitarias cubren todos los casos de aceptación de la lógica de negocio.; Las pruebas de integración verifican el comportamiento de los endpoints para casos exitosos y de error.; El repositorio de reservas está optimizado para consultas frecuentes de solapamientos. | — | — |

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Lo que falta y tenes que completar

No se detectaron huecos: estan los archivos declarados, el boilerplate del stack y ninguna referencia quedo colgando. Igual corre el comando de verificacion — que los archivos existan no garantiza que compilen.

### Presentes (14)

- `package.json`
- `tsconfig.json`
- `src/infrastructure/config/validation.pipe.ts`
- `src/domain/models/reservation.model.ts`
- `src/infrastructure/controllers/reservation.controller.ts`
- `src/application/services/reservation.service.ts`
- `src/infrastructure/repositories/reservation.repository.ts`
- `src/acceptance/f1.test.ts`
- `src/domain/ports/reservation.repository.port.ts`
- `src/acceptance/f2.test.ts`
- `src/test/unit/reservation.service.spec.ts`
- `src/test/integration/reservation.controller.spec.ts`
- `src/main.ts`
- `src/app.module.ts`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `src/domain/models` (presente)
- `src/domain/ports` (presente)
- `src/application/services` (presente)
- `src/infrastructure/controllers` (presente)
- `src/infrastructure/repositories` (presente)
- `src/infrastructure/dto` (ausente)
- `src/infrastructure/config` (presente)
- `test/unit` (ausente)
- `test/integration` (ausente)

## Verificacion

```bash
npm install --no-audit --no-fund && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **hexagonal/clean**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: Construye una API REST de reservas de salas de reunion con validacion de solapamientos

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
