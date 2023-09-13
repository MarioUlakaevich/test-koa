const {Sequelize} = require('sequelize');
import * as dotenv from 'dotenv';

dotenv.config();

export const dbConnect = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);