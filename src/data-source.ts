import * as dotenv from 'dotenv';
import path from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config();

const DevAppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,

  synchronize: false,
  logging: true,

  entities: [path.join(__dirname, './entities/**/*.{js,ts}')],
  migrations: [path.join(__dirname, './migrations/**/*.{js,ts}')],
});

const TestAppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [path.join(__dirname, './entities/**/*.{js,ts}')],
  synchronize: true,
});

export const AppDataSource =
  process.env.NODE_ENV === 'test' ? TestAppDataSource : DevAppDataSource;
