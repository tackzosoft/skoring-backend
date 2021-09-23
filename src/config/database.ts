import env from '../utility/env';
import { DatabaseInterface } from './configTypes';

const database: DatabaseInterface = {
  host: env('MYSQL_DB_HOST', 'database-3.c72yrwunehm7.us-east-2.rds.amazonaws.com'),
  port: env('MYSQL_DB_PORT', '3306'),
  user: env('MYSQL_DB_USER', 'admin'),
  password: env('MYSQL_DB_PASSWORD', '9818828332'),
  name: env('MYSQL_DB_NAME', 'tutor_database'),
};

export default database;
