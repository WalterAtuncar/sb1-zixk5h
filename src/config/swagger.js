const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Web Analyzer API',
      version: '1.0.0',
      description: 'API for web page analysis and testing with authentication',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints'
      },
      {
        name: 'Analyzer',
        description: 'Web page analysis endpoints'
      },
      {
        name: 'Tests',
        description: 'Test execution endpoints'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 400
                },
                message: {
                  type: 'string',
                  example: 'Error message'
                }
              }
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'demo',
              description: 'User\'s username'
            },
            password: {
              type: 'string',
              example: 'demo123',
              description: 'User\'s password'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Login successful'
            },
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
          }
        },
        AnalyzeRequest: {
          type: 'object',
          required: ['url'],
          properties: {
            url: {
              type: 'string',
              example: 'https://example.com',
              description: 'URL of the web page to analyze'
            },
            headers: {
              type: 'object',
              description: 'Custom headers for the request',
              example: {
                'Custom-Header': 'value'
              }
            }
          }
        },
        AnalyzeResponse: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: 'https://example.com'
            },
            elements: {
              type: 'object',
              properties: {
                inputs: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        example: 'text'
                      },
                      name: {
                        type: 'string',
                        example: 'username'
                      },
                      id: {
                        type: 'string',
                        example: 'user-input'
                      },
                      value: {
                        type: 'string',
                        example: ''
                      }
                    }
                  }
                },
                selects: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'country'
                      },
                      id: {
                        type: 'string',
                        example: 'country-select'
                      },
                      options: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            value: {
                              type: 'string',
                              example: 'us'
                            },
                            text: {
                              type: 'string',
                              example: 'United States'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                buttons: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        example: 'submit'
                      },
                      text: {
                        type: 'string',
                        example: 'Submit'
                      },
                      id: {
                        type: 'string',
                        example: 'submit-button'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        TestCaseRequest: {
          type: 'object',
          required: ['testCases'],
          properties: {
            testCases: {
              type: 'array',
              description: 'Array of test cases to execute',
              items: {
                type: 'object',
                required: ['id', 'name'],
                properties: {
                  id: {
                    type: 'string',
                    example: 'test-1',
                    description: 'Unique identifier for the test case'
                  },
                  name: {
                    type: 'string',
                    example: 'Login Test',
                    description: 'Name of the test case'
                  }
                }
              }
            }
          }
        },
        TestExecutionResponse: {
          type: 'object',
          properties: {
            totalTests: {
              type: 'number',
              example: 10,
              description: 'Total number of tests executed'
            },
            passed: {
              type: 'number',
              example: 8,
              description: 'Number of passed tests'
            },
            failed: {
              type: 'number',
              example: 2,
              description: 'Number of failed tests'
            },
            results: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: 'test-1'
                  },
                  name: {
                    type: 'string',
                    example: 'Login Test'
                  },
                  status: {
                    type: 'string',
                    enum: ['passed', 'failed'],
                    example: 'passed'
                  },
                  duration: {
                    type: 'number',
                    example: 123.45,
                    description: 'Test execution duration in milliseconds'
                  },
                  timestamp: {
                    type: 'string',
                    format: 'date-time',
                    example: '2023-12-20T10:00:00Z'
                  },
                  error: {
                    type: 'string',
                    example: 'Assertion failed',
                    description: 'Error message if the test failed'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);