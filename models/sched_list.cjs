const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sched_list',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.STRING(14),
        allowNull: true,
      },
      schedTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      schedDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      purpose: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      done: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: '0= not yet done\\n1=done\\n2=cancelled\\n',
      },
    },
    {
      sequelize,
      tableName: 'sched_list',
      timestamps: false,
    }
  );
};
