// src/controllers/gameConfigController.js

import db from '../database/database.js';
//en general funciones para intercatiar con la base de datos
export async function createConfiguration(request, reply) {

  //Es una desestructuración de objetos, No importa el orden,unicamente los nombres deben coincidir exactamente con las claves del JSON.
  //Saca is_default de request.body y guárdalo como isDefault para mas legibilidad en javascript.
  const {
    is_default: isDefault,
    points_to_win,
    serve_delay,
    ball_color,
    bar_color,
    field_color
  } = request.body;

  // Los '?' representan los valores que vas a insertar y tu gestionas el orden por posicion.
  const stmt = db.prepare(`
    INSERT INTO configuration (
      is_default, points_to_win, serve_delay,
      ball_color, bar_color, field_color
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    isDefault ? 1 : 0,  //si es true guarda 1 ,sino 0. Casteo para la bd.
    points_to_win,
    serve_delay,
    ball_color,
    bar_color,
    field_color
  );

  return reply.code(201).send({ message: 'Configuración guardada correctamente ✅' });
}

export async function getAllConfigurations(request, reply) {
  const stmt = db.prepare(`SELECT * FROM configuration`);
  const configs = stmt.all();
  return reply.send(configs);
}