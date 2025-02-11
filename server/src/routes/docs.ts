import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const EXPLORER_PATH = join(__dirname, '../../explorer/index.html');

const router = Router();

// Serve API Explorer UI
router.get('/', (req, res) => {
  res.sendFile(EXPLORER_PATH);
});

// Generate OpenAPI documentation
router.get('/swagger.json', (req, res) => {
  const swaggerDocs = {
    openapi: '3.0.0',
    info: {
      title: 'BookCut API',
      version: '1.0.0',
      description: 'API for managing barbershop appointments and services'
    },
    servers: [
      {
        url: '/api',
        description: 'API Base URL'
      }
    ],
    paths: {
      '/booking/services': {
        get: {
          summary: 'Get all services',
          tags: ['Booking'],
          responses: {
            200: {
              description: 'List of services',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Service' }
                  }
                }
              }
            }
          }
        }
      },
      '/admin/verify-code': {
        post: {
          summary: 'Verify admin access code',
          tags: ['Admin'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['code'],
                  properties: {
                    code: {
                      type: 'string',
                      example: 'ADMIN123'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Access granted',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Access granted' },
                      token: { type: 'string', example: 'admin-token' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Invalid access code',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      message: { type: 'string', example: 'Invalid access code' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/admin/bookings': {
        get: {
          summary: 'Get all bookings',
          tags: ['Admin'],
          responses: {
            200: {
              description: 'List of bookings',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Booking'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/admin/bookings/{id}/status': {
        post: {
          summary: 'Update booking status',
          tags: ['Admin'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['pending', 'accepted', 'declined']
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Booking status updated',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/admin/bookings/{id}/reschedule': {
        post: {
          summary: 'Reschedule booking',
          tags: ['Admin'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['appointment_date'],
                  properties: {
                    appointment_date: {
                      type: 'string',
                      format: 'date-time'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Booking rescheduled',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Service: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            duration: { type: 'integer' },
            price: { type: 'number' },
            is_active: { type: 'boolean' }
          }
        },
        Barber: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            bio: { type: 'string' },
            image_url: { type: 'string' },
            is_active: { type: 'boolean' }
          }
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            customer_name: { type: 'string' },
            customer_email: { type: 'string' },
            appointment_date: { type: 'string', format: 'date-time' },
            status: { 
              type: 'string',
              enum: ['pending', 'accepted', 'declined']
            },
            notes: { type: 'string' },
            service_name: { type: 'string' },
            service_duration: { type: 'integer' },
            barber_name: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  };

  res.json(swaggerDocs);
});

export { router as docsRouter };
