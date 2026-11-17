# Desarrollo de API REST para reservas de salas de reunión

El sistema de reservas de salas de reunión permite a los usuarios reservar salas para reuniones. Cada reserva debe tener un nombre, una fecha y hora de inicio, y una duración. El sistema debe validar que no haya solapamientos de reservas en la misma sala. Los usuarios pueden ser empleados de la empresa y las salas son gestionadas por el departamento de recursos humanos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | API de reservas de salas |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Stack

- **Lenguaje:** TypeScript
- **Framework:** NestJS 10
- **Version:** Node 22

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `npm install --no-audit --no-fund && npm run build` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `npm install --no-audit --no-fund && npm run build`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Definición de endpoints y modelo de datos

**Objetivo:** Definir los endpoints necesarios y el modelo de datos para las reservas de salas.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identificar los endpoints necesarios para crear, leer, actualizar y eliminar reservas de salas.
- Definir el modelo de datos para las reservas, incluyendo los atributos necesarios y las relaciones entre entidades.

**Entregable:** Documentación de los endpoints y modelo de datos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera los diferentes verbos HTTP y su uso en REST.
- Piensa en las relaciones entre las entidades 'usuario' y 'sala'.

</details>

### Fase 2: Implementación de la lógica de negocio

**Objetivo:** Implementar la lógica de negocio para la validación de solapamientos de reservas.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Desarrollar la lógica para validar que no haya solapamientos de reservas en la misma sala.
- Manejar los casos en los que se intenta hacer una reserva que solapa con otra existente.

**Entregable:** Código implementado para la lógica de negocio de validación de solapamientos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo representar las reservas en términos de intervalos de tiempo.
- Piensa en los diferentes casos de solapamiento y cómo manejarlos.

</details>

### Fase 3: Pruebas y optimización

**Objetivo:** Realizar pruebas unitarias y de integración, y optimizar la API.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa pruebas unitarias para la lógica de validación de solapamientos (pieza p3) usando mocks del repositorio de reservas.
- Implementa pruebas de integración para los endpoints de reservas (pieza p5) verificando respuestas HTTP y manejo de errores.
- Optimiza el acceso a datos mediante índices o consultas eficientes en el repositorio de reservas (pieza p6).
- Asegúrate de que las pruebas cubran al menos 2 casos de error o borde por pieza.

**Entregable:** Código de pruebas unitarias y de integración, y optimizaciones aplicadas a la API.

<details>
<summary>Pistas de conocimiento</summary>

- Usa frameworks de pruebas para Node.js.
- Considera técnicas de optimización como caching y lazy loading.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una API REST y cómo se usa en el contexto de reservas de salas?
- **paraQueSirve**: ¿Para qué sirve validar solapamientos en las reservas de salas?
- **comoSeUsa**: ¿Cómo se usa la lógica de negocio para validar solapamientos?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar la lógica de validación de solapamientos?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización de la API en términos de rendimiento y escalabilidad?

## Criterios de Evaluacion

- Definición correcta de endpoints y modelo de datos.
- Implementación de la lógica de negocio para validar solapamientos.
- Realización de pruebas unitarias y de integración.
- Aplicación de técnicas de optimización para mejorar el rendimiento y la escalabilidad.

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

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install --no-audit --no-fund && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
