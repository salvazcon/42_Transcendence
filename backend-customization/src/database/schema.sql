CREATE TABLE IF NOT EXISTS configuration (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  points_to_win INTEGER NOT NULL,
  serve_delay INTEGER NOT NULL,
  ball_color TEXT NOT NULL,
  bar_color TEXT NOT NULL,
  field_color TEXT NOT NULL
);