# Emergencias Challenge - API de Agenda de Contactos

Este proyecto es una API RESTful para una "Agenda de Contactos", desarrollada como solución para el Desafío Backend de Emergencias. Permite gestionar contactos con múltiples teléfonos y direcciones, además de realizar un seguimiento de las actividades asociadas a dichos contactos.

## 🚀 Stack Tecnológico

- **Entorno de ejecución:** Node.js
- **Framework:** Express.js (v5)
- **Lenguaje:** TypeScript (Tipado estricto)
- **Base de datos:** PostgreSQL
- **ORM:** Prisma (v7)
- **Validación:** Zod
- **Pruebas:** Jest
- **Logging:** Morgan
- **Calidad de Código:** ESLint & Prettier

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Limpia (Hexagonal)** para garantizar la mantenibilidad, escalabilidad y facilidad de prueba:

- **Domain (Dominio):** Entidades de negocio e interfaces de repositorio.
- **Application (Aplicación):** Casos de uso que orquestan la lógica de negocio.
- **Infrastructure (Infraestructura):** Implementaciones específicas del framework (Prisma, Express, Rutas, Controladores).
- **Shared (Compartido):** Utilidades comunes como clases de error personalizadas y manejadores de errores globales.

## 🛠️ Configuración e Instalación

### Prerrequisitos
- Node.js (v18+)
- Instancia de PostgreSQL en ejecución

### Instalación
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno. Crear un archivo `.env` en la raíz:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://usuario:password@localhost:5432/emergencias_db?schema=public"
   ```
4. Ejecutar las migraciones de Prisma para configurar la base de datos:
   ```bash
   npx prisma migrate dev
   ```
5. Poblar la base de datos con datos iniciales (Tipos de Teléfono):
   ```bash
   npx prisma db seed
   ```
6. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Ejecución con Docker (Recomendado)
Si tienes Docker y Docker Compose instalados, puedes iniciar todo el entorno (API + Base de Datos) con un solo comando:
```bash
docker-compose up --build
```
La API estará disponible en `http://localhost:3000` y la documentación en `http://localhost:3000/api-docs`.

## 📖 Documentación de la API

### Contactos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/contacts` | Crea un nuevo contacto con teléfonos y direcciones. |
| GET | `/contacts/email/:email` | Busca un contacto por email. |
| GET | `/contacts/search` | Busca contactos por `firstName` o `lastName` (parámetros de consulta). |
| GET | `/contacts/search/phone` | Busca contactos por número de teléfono (`number`) y tipo (`phoneTypeId`) (parámetros de consulta). |
| PUT | `/contacts/:id` | Actualiza la información personal de un contacto. |
| DELETE | `/contacts/:id` | Elimina un contacto. |

### Actividades
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/activities` | Registra una nueva actividad (`call`, `meeting`, `email`). |
| GET | `/activities/search` | Busca actividades por `personId` y `activityType` (parámetros de consulta). |

### Verificación de Salud (Health Check)
- `GET /health`: Retorna el estado de la API.

## 🧪 Pruebas y Linting

### Ejecutar Pruebas
```bash
npm test
```

### Linting y Formateo
```bash
# Verificar errores de linting
npm run lint

# Corregir problemas de formateo
npm run format
```

## 📋 Criterios de Evaluación Abordados
- **Clean Code:** Adhesión a los principios SOLID y convenciones de nombres claras.
- **Arquitectura:** Capas desacopladas utilizando el Patrón Repositorio.
- **Patrones de Diseño:** Patrón de Caso de Uso e Inversión de Dependencias.
- **Tipado Estricto:** No se utiliza `any`; interfaces para todas las estructuras de datos.
- **Semántica HTTP Correcta:** Códigos de estado adecuados (201 para creación, 204 para eliminación, 404 para no encontrado, etc.).
- **Nombres de Tablas:** Mapeo exacto a los nombres especificados en el PDF (`Person`, `Phone`, `Address`, `PhoneType`, `ContactActivities`).
