const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activity_log', {
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    middleName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING(26),
      allowNull: true,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'activity_log',
    timestamps: true
  });
};
