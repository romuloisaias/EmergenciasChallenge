import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge Agenda de Contactos - Emergencias',
      version: '1.0.0',
      description: 'API para la gestión de contactos y actividades',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Phone: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            number: { type: 'string' },
            phoneTypeId: { type: 'integer' },
            phoneType: {
              type: 'object',
              properties: {
                typeName: { type: 'string' },
              },
            },
          },
        },
        Address: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            locality: { type: 'string' },
            street: { type: 'string' },
            number: { type: 'string' },
            notes: { type: 'string', nullable: true },
          },
        },
        Person: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            phones: { type: 'array', items: { $ref: '#/components/schemas/Phone' } },
            addresses: { type: 'array', items: { $ref: '#/components/schemas/Address' } },
          },
        },
        Activity: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            personId: { type: 'integer' },
            activityType: { type: 'string', enum: ['call', 'meeting', 'email'] },
            activityDate: { type: 'string', format: 'date-time' },
            description: { type: 'string' },
            person: {
              type: 'object',
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                dateOfBirth: { type: 'string', format: 'date' },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/infrastructure/http/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
