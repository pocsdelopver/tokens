const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tokens',
      version: '1.0.0',
      description: 'API para autenticación y validación de tokens',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          name: 'Authorization'
        },
      },
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
  swaggerDefinition: {
    produces: ['application/json'],
    consumes: ['application/json'],
  }
};

const specs = swaggerJsdoc(options);

module.exports = specs; 