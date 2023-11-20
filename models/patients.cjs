const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'patients',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      patientNo: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      middleName: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      area: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      barangay: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      municipality: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      sex: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      religion: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pob: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      occupation: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      phoneNo: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      incaseEmergency: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      incaseRelationship: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      incasePhoneNo: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      incaseAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      blacklisted: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      blacklistReason: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'patients',
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
