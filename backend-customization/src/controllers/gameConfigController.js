// src/controllers/gameConfigController.js

import db from '../database/database.js';

export async function createConfiguration(request, reply) {
  const {
    default: isDefault,
    points_to_win,
    serve_delay,
    ball_color,
    bar_color,
    field_color
  } = request.body;

  const stmt = db.prepare(`
    INSERT INTO configuration (
      default, points_to_win, serve_delay,
      ball_color, bar_color, field_color
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    isDefault ? 1 : 0,
    points_to_win,
    serve_delay,
    ball_color,
    bar_color,
    field_color
  );

  return reply.code(201).send({ message: 'Configuración guardada correctamente ✅' });
}