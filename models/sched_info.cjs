const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sched_info', {
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    middleName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    labCode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    additionalRemarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    testId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'sched_info',
    timestamps: true
  });
};
