const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'schedules',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patientID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      requestID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      schedTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      schedDuration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      done: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      notificationSent: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'schedules',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
