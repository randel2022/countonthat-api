import * as dotenv from 'dotenv'
dotenv.config()

import { dbPool } from "./database/database.js"
import { dirname } from 'path';
import migration from 'mysql-migrations';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

migration.init(dbPool, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});