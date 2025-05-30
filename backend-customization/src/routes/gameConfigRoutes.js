import { createConfiguration } from '../controllers/gameConfigController.js';

export default async function (fastify, options) {
  // Ruta protegida: solo usuarios autenticados pueden acceder
  fastify.post('/configuration', {
    preValidation: [fastify.authenticate]
  }, createConfiguration);
}