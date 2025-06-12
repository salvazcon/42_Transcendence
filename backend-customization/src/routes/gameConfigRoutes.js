import { createConfiguration, getAllConfigurations } from '../controllers/gameConfigController.js';

// En caso de validarse correctamente el token, ejecuta la funcion del final.
// ¿Qué significa async aquí? Permite que la función puede usar await.
// ¿Qué es '/configuration'? Se define la ruta para organizar las diferentes peticiones.

export default async function (fastify, options) {
  fastify.post('/configuration', {
    preValidation: [fastify.authenticate]
  }, createConfiguration);

  fastify.get('/configuration', {
    preValidation: [fastify.authenticate]
  }, getAllConfigurations);
}