import { Router } from 'express';
import { DispositivoController } from '../controllers/DispositivoController';

const router = Router();

/**
 * @swagger
 * /dispositivos:
 *   get:
 *     summary: Lista todos os dispositivos
 *     description: Retorna todos os dispositivos eletrônicos cadastrados, ordenados por ID.
 *     tags: [Dispositivos]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dispositivo'
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Erro interno ao listar dispositivos.
 */
router.get('/', DispositivoController.index);

/**
 * @swagger
 * /dispositivos/{id}:
 *   get:
 *     summary: Busca um dispositivo pelo ID
 *     description: Retorna os dados detalhados de um dispositivo específico.
 *     tags: [Dispositivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do dispositivo
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Dispositivo encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dispositivo'
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: O ID informado deve ser um número inteiro positivo.
 *       404:
 *         description: Dispositivo não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Dispositivo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Erro interno ao buscar dispositivo.
 */
router.get('/:id', DispositivoController.show);

/**
 * @swagger
 * /dispositivos:
 *   post:
 *     summary: Cadastra um novo dispositivo
 *     description: Cria um novo dispositivo eletrônico e o persiste no banco de dados.
 *     tags: [Dispositivos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DispositivoInput'
 *     responses:
 *       201:
 *         description: Dispositivo criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dispositivo'
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: O campo "nome" é obrigatório e deve ser um texto.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Erro interno ao criar dispositivo.
 */
router.post('/', DispositivoController.create);

/**
 * @swagger
 * /dispositivos/{id}:
 *   put:
 *     summary: Atualiza um dispositivo
 *     description: Atualiza todos os dados de um dispositivo existente pelo ID.
 *     tags: [Dispositivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do dispositivo
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DispositivoInput'
 *     responses:
 *       200:
 *         description: Dispositivo atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dispositivo'
 *       400:
 *         description: ID inválido ou campos obrigatórios ausentes/inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: O campo "preco" é obrigatório e deve ser um número maior que zero.
 *       404:
 *         description: Dispositivo não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Dispositivo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Erro interno ao atualizar dispositivo.
 */
router.put('/:id', DispositivoController.update);

/**
 * @swagger
 * /dispositivos/{id}:
 *   delete:
 *     summary: Remove um dispositivo
 *     description: Remove um dispositivo do banco de dados pelo ID.
 *     tags: [Dispositivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do dispositivo
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Dispositivo removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Dispositivo removido com sucesso.
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: O ID informado deve ser um número inteiro positivo.
 *       404:
 *         description: Dispositivo não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Dispositivo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               mensagem: Erro interno ao remover dispositivo.
 */
router.delete('/:id', DispositivoController.delete);

export { router as dispositivoRoutes };
