import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { sequelize } from './config/database';
import { swaggerSpec } from './config/swagger';
import { dispositivoRoutes } from './routes/dispositivoRoutes';
import './models/Dispositivo'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: 'API de Dispositivos Eletrônicos funcionando!',
    documentacao: '/api-docs'
  });
});
app.use('/dispositivos', dispositivoRoutes);

app.use((err: Error & { type?: string }, req: Request, res: Response, next: express.NextFunction) => {
  if (err.type === 'entity.parse.failed') {
    res.status(400).json({ mensagem: 'JSON inválido no corpo da requisição.' });
    return;
  }
  next(err);
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');

    await sequelize.sync();
    console.log('Tabela "dispositivos" sincronizada.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
}

main();