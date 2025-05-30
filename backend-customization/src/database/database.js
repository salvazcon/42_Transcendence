import Database from 'better-sqlite3'; //Importa la librería better-sqlite3
import fs from 'fs/promises'; //Importa el módulo de archivos de Node.js (fs)
import path from 'path'; //Importa el módulo de rutas de Node.js
import { fileURLToPath } from 'url'; //Convierte URL(import.meta.url) en una ruta de sistema

/* Definimos la Ruta absoluta:
import.meta.url	-> Devuelve la URL en ruta de sistema. "file:///home/usuario/proyecto/src/database/database.js"
fileURLToPath() -> Convierte la URL a una ruta real. "/home/usuario/proyecto/src/database/database.js"
path.dirname()  -> Devuelve la carpeta donde está el archivo. "/home/usuario/proyecto/src/database/" 
*/
const __filename = fileURLToPath(import.meta.url); //ruta completa al archivo
const __dirname = path.dirname(__filename); //carpeta donde está este archivo

// Ruta al archivo de base de datos
const dbPath = path.join(__dirname, 'database.sqlite'); //"databese.sqlite" nombre de la bd, es modificable
const db = new Database(dbPath);

// Ejecutar el schema.sql al arrancar
export async function initializeDB() {
  const schemaPath = path.join(__dirname, 'schema.sql'); //Creamos la ruta
  const schema = await fs.readFile(schemaPath, 'utf-8'); // lee "fs.readFile" y espera "await" a que termine.
  db.exec(schema); // ejecutamos el archivo
}

// Exportamos la instancia de base de datos para usarla en otros archivos
export default db;