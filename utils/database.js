import { Sequelize } from 'sequelize';

const newDB = new Sequelize('dwhms', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

export { newDB };
