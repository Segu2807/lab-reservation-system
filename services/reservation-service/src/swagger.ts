import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reservation Service API',
      version: '1.0.0',
      description: 'API para gestión de reservas de laboratorios'
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Local'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
});
