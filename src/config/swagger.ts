import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Dispositivos Eletrônicos',
      version: '1.0.0',
      description:
        'API RESTful para cadastro e gerenciamento de dispositivos eletrônicos (smartphones, notebooks, fones, etc.).'
    },
    servers: [{ url: '/', description: 'Servidor atual' }],
    tags: [
      { name: 'Dispositivos', description: 'Operações de CRUD de dispositivos eletrônicos' }
    ],
    components: {
      schemas: {
        Dispositivo: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'iPhone 15' },
            marca: { type: 'string', example: 'Apple' },
            categoria: { type: 'string', example: 'Smartphone' },
            preco: { type: 'number', format: 'double', example: 4999.9 },
            estoque: { type: 'integer', example: 25 },
            ativo: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time', example: '2026-10-05T14:30:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2026-10-05T14:30:00.000Z' }
          }
        },
        DispositivoInput: {
          type: 'object',
          required: ['nome', 'marca', 'categoria', 'preco', 'estoque'],
          properties: {
            nome: { type: 'string', example: 'iPhone 15' },
            marca: { type: 'string', example: 'Apple' },
            categoria: { type: 'string', example: 'Smartphone' },
            preco: { type: 'number', minimum: 0.01, example: 4999.9 },
            estoque: { type: 'integer', minimum: 0, example: 25 },
            ativo: { type: 'boolean', example: true }
          }
        },
        Erro: {
          type: 'object',
          properties: {
            mensagem: { type: 'string' }
          }
        }
      }
    }
  },
apis: [path.join(__dirname, '../routes/*.{ts,js}').replace(/\\/g, '/')]
};

export const swaggerSpec = swaggerJsdoc(options);
