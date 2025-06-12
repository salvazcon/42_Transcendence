import Fastify from 'fastify';         // Importa el framework Fastify.
import jwt from '@fastify/jwt';        // Importa el plugin de autenticación JWT para Fastify.
import cors from '@fastify/cors';      // Importa el plugin para configurar CORS (Permite que el frontendse cominique con el backend).
import cookie from '@fastify/cookie';  // Importa el plugin para gestionar cookies.
import { initializeDB } from './database/database.js';        // Función para inicializa schema.sql y conectando con SQLite.
import gameConfigRoutes from './routes/gameConfigRoutes.js';  // Importa el archivo donde defines las rutas.

const app = Fastify({ logger: true }); /* app se convierte en el núcleo del backend donde configuraremos todo, 
                                        aparte activamos el modo de registro (log). */

/* Cuando el frontend está en un dominio distinto (por ejemplo: localhost:8080) 
y el backend en otro (localhost:3001), el navegador bloquea las peticiones por
seguridad, a menos que se configure CORS. */

//Configuramos y añadimos CORS.
app.register(cors, {  
  origin: process.env.FRONTEND_BASEURL_EXTERNAL || true,  /* Permite peticiones desde la URL configurada. Si la variable esta vacia, 
                                                          se permite desde cualquier sitio (true). */
  credentials: true,                                      // Permite enviar cookies o cabeceras de autenticación.
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']      // Métodos HTTP que se permiten.
});

// Activa el soporte para leer y enviar cookies.
app.register(cookie);

// Añadimos el plugin JWT y configuramos constraseña. Si la variable esta vacia, la constraseña sera 'supersecreto'
app.register(jwt, {
  secret: process.env.TOKEN_SECRET_KEY
});

/* console.log("🔐 TOKEN_SECRET_KEY = ", process.env.TOKEN_SECRET_KEY); */

/* Añadiendo función para verifica si la petición tiene un token JWT válido.
  - Si el token está caducado, mal firmado o simplemente no existesaltara un error. */
/* Objetos que Fastify te da automáticamente en cada petición HTTP que recibe tu servidor.
  - "request" contiene toda la información de la petición.
  - "reply" objeto que te permite responder al cliente. */
app.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();    //si todo sale bien guaradara la info. en "request.user"
  } catch (err) {
    reply.code(401).send({ error: 'Token no válido o no enviado' });
  }
});

// Registra nuestras rutas.
app.register(gameConfigRoutes);

// Prueba para ver si el servidor responde.
app.get('/', async () => {
  return { message: 'Servidor funcionando 🔧' };
});

//
const start = async () => {
  try {
    await initializeDB();  // Inicia la BD
    await app.listen({ port: 3001, host: '0.0.0.0' });  // Levanta servidor en todas las IPs
    console.log(`Servidor escuchando en http://localhost:3001`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start(); // Iniciamos todo mediante la funcion 'start' que hemos creado anteriormente (no es un comando).