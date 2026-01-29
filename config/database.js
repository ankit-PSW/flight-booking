import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('Connected Database Config:', {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT
});
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});

export default sequelize;