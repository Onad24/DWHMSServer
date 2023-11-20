const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'cases',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      patientID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      requestID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'laboratory_request',
          key: 'id',
        },
      },
      scheduleID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'schedules',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'cases',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'patientID_idx',
          using: 'BTREE',
          fields: [{ name: 'patientID' }],
        },
      ],
    }
  );
};
