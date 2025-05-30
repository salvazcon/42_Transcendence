import dotenv from 'dotenv';
import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { initializeDB } from './database/database.js';
import gameConfigRoutes from './routes/gameConfigRoutes.js';

dotenv.config();

const app = Fastify({ logger: true });

app.register(cors, {
  origin: process.env.FRONTEND_BASEURL_EXTERNAL || true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
});

app.register(cookie);

app.register(jwt, {
  secret: process.env.TOKEN_SECRET_KEY || 'supersecreto'
});

app.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: 'Token no válido o no enviado' });
  }
});

app.register(gameConfigRoutes);

app.get('/', async () => {
  return { message: 'Servidor funcionando 🔧' };
});

const start = async () => {
  try {
    await initializeDB();
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Servidor escuchando en http://localhost:3001`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();