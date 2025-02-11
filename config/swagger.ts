import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookCut API',
      version: '1.0.0',
      description: 'API for managing barbershop appointments and services',
    },
    servers: [
      {
        url: '/api',
        description: 'API Base URL',
      },
    ],
    components: {
      schemas: {
        Barber: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            bio: { type: 'string' },
            image_url: { type: 'string' },
            is_active: { type: 'boolean' }
          }
        }
      }
    },
    paths: {
      '/barbers': {
        get: {
          tags: ['Barbers'],
          summary: 'Get all barbers',
          responses: {
            200: {
              description: 'List of barbers',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Barber' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Barbers'],
          summary: 'Create a new barber',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Barber' }
              }
            }
          },
          responses: {
            200: {
              description: 'Barber created successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Barber' }
                }
              }
            }
          }
        }
      },
      '/barbers/{id}': {
        get: {
          tags: ['Barbers'],
          summary: 'Get barber by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' }
            }
          ],
          responses: {
            200: {
              description: 'Barber details',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Barber' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Barbers'],
          summary: 'Update barber',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Barber' }
              }
            }
          },
          responses: {
            200: {
              description: 'Barber updated successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Barber' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Barbers'],
          summary: 'Delete barber',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' }
            }
          ],
          responses: {
            200: {
              description: 'Barber deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./api/**/*.ts']
};

export const specs = swaggerJsdoc(options);
