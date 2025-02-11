const barberPaths = {
  '/api/barbers': {
    post: {
      tags: ['Barbers'],
      summary: 'Create a new barber',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string' },
                bio: { type: 'string', nullable: true },
                image_url: { type: 'string', nullable: true },
                is_active: { type: 'boolean', default: true }
              }
            }
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
    },
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
    }
  },
  '/api/barbers/{id}': {
    get: {
      tags: ['Barbers'],
      summary: 'Get barber by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Barber found',
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
          schema: { type: 'string' }
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
          description: 'Barber updated',
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
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Barber deleted',
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
};

export const openApiSpecification = {
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
  components: {
    schemas: {
      Barber: {
        type: 'object',
        required: ['name'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Barber unique identifier'
          },
          name: {
            type: 'string',
            description: 'Barber name'
          },
          bio: {
            type: 'string',
            nullable: true,
            description: 'Barber biography'
          },
          image_url: {
            type: 'string',
            nullable: true,
            description: 'URL to barber profile image'
          },
          is_active: {
            type: 'boolean',
            description: 'Whether the barber is currently active'
          }
        }
      },
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
      Booking: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          customer_name: { type: 'string' },
          customer_email: { type: 'string' },
          appointment_date: { type: 'string', format: 'date-time' },
          status: { type: 'string', enum: ['pending', 'accepted', 'declined'] },
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
  },
  paths: {
    ...barberPaths,
    '/barbers': {
      get: {
        tags: ['Barber Management'],
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
        tags: ['Barber Management'],
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
        tags: ['Barber Management'],
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
        tags: ['Barber Management'],
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
            description: 'Barber updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Barber' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Barber Management'],
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
            description: 'Success',
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
    },
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
      // ...existing code...
    },
    '/admin/bookings': {
      // ...existing code...
    },
    '/admin/bookings/{id}/status': {
      // ...existing code...
    },
    '/admin/bookings/{id}/reschedule': {
      // ...existing code...
    },
    '/booking/barbers': {
      get: {
        tags: ['Booking'],
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
      }
    },
    '/admin/barbers': {
      post: {
        tags: ['Admin'],
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
      },
      get: {
        tags: ['Admin'],
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
      }
    },
    '/admin/barbers/{id}': {
      get: {
        tags: ['Admin'],
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
        tags: ['Admin'],
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
            description: 'Barber updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Barber' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Admin'],
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
            description: 'Success',
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
};
