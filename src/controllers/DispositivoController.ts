import { Request, Response } from 'express';
import { Dispositivo } from '../models/Dispositivo';

interface DispositivoInput {
  nome: string;
  marca: string;
  categoria: string;
  preco: number;
  estoque: number;
  ativo?: boolean;
}

const textoValido = (v: unknown): v is string =>
  typeof v === 'string' && v.trim() !== '';

function validarCorpo(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) {
    return 'O corpo da requisição deve ser um JSON válido.';
  }
  const { nome, marca, categoria, preco, estoque, ativo } =
    body as Record<string, unknown>;

  if (!textoValido(nome)) return 'O campo "nome" é obrigatório e deve ser um texto.';
  if (!textoValido(marca)) return 'O campo "marca" é obrigatório e deve ser um texto.';
  if (!textoValido(categoria)) return 'O campo "categoria" é obrigatório e deve ser um texto.';
  if (typeof preco !== 'number' || !Number.isFinite(preco) || preco <= 0) {
    return 'O campo "preco" é obrigatório e deve ser um número maior que zero.';
  }
  if (typeof estoque !== 'number' || !Number.isInteger(estoque) || estoque < 0) {
    return 'O campo "estoque" é obrigatório e deve ser um inteiro maior ou igual a zero.';
  }
  if (ativo !== undefined && typeof ativo !== 'boolean') {
    return 'O campo "ativo" deve ser verdadeiro ou falso.';
  }
  return null;
}


function lerId(req: Request): number | null {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export class DispositivoController {
  // GET /dispositivos
  public static async index(req: Request, res: Response): Promise<Response> {
    try {
      const dispositivos = await Dispositivo.findAll({ order: [['id', 'ASC']] });
      return res.status(200).json(dispositivos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro interno ao listar dispositivos.' });
    }
  }

  // GET /dispositivos/:id
  public static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = lerId(req);
      if (id === null) {
        return res.status(400).json({ mensagem: 'O ID informado deve ser um número inteiro positivo.' });
      }

      const dispositivo = await Dispositivo.findByPk(id);
      if (!dispositivo) {
        return res.status(404).json({ mensagem: 'Dispositivo não encontrado.' });
      }
      return res.status(200).json(dispositivo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro interno ao buscar dispositivo.' });
    }
  }

  // POST /dispositivos
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const erro = validarCorpo(req.body);
      if (erro) return res.status(400).json({ mensagem: erro });

      const dados = req.body as DispositivoInput;
      const novo = await Dispositivo.create({
        nome: dados.nome.trim(),
        marca: dados.marca.trim(),
        categoria: dados.categoria.trim(),
        preco: dados.preco,
        estoque: dados.estoque,
        ativo: dados.ativo ?? true
      });
      return res.status(201).json(novo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro interno ao criar dispositivo.' });
    }
  }

  // PUT /dispositivos/:id
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = lerId(req);
      if (id === null) {
        return res.status(400).json({ mensagem: 'O ID informado deve ser um número inteiro positivo.' });
      }

      const erro = validarCorpo(req.body);
      if (erro) return res.status(400).json({ mensagem: erro });

      const dispositivo = await Dispositivo.findByPk(id);
      if (!dispositivo) {
        return res.status(404).json({ mensagem: 'Dispositivo não encontrado.' });
      }

      const dados = req.body as DispositivoInput;
      await dispositivo.update({
        nome: dados.nome.trim(),
        marca: dados.marca.trim(),
        categoria: dados.categoria.trim(),
        preco: dados.preco,
        estoque: dados.estoque,
        ativo: dados.ativo ?? dispositivo.ativo
      });
      return res.status(200).json(dispositivo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar dispositivo.' });
    }
  }

  // DELETE /dispositivos/:id
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = lerId(req);
      if (id === null) {
        return res.status(400).json({ mensagem: 'O ID informado deve ser um número inteiro positivo.' });
      }

      const dispositivo = await Dispositivo.findByPk(id);
      if (!dispositivo) {
        return res.status(404).json({ mensagem: 'Dispositivo não encontrado.' });
      }

      await dispositivo.destroy();
      return res.status(200).json({ mensagem: 'Dispositivo removido com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro interno ao remover dispositivo.' });
    }
  }
}
