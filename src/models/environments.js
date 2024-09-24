const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { isAfterCreation } = require('../helpers/DateValidation.js');
const { createImmutableField } = require('../helpers/immutableFields.js');

module.exports = (sequelize, DataTypes) => {
  class Environments extends Model {
    static associate(models) {
      Environments.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id'
      })
    }
  }
  Environments.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: {
          msg: 'O campo id não pode estar vazio.'
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    softwareType: {
      type: DataTypes.ENUM('erp','sgbd'),
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'O campo softwareType não pode estar vazio.'
        }
      }
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo não pode estar vazio.'
        },
        isDate: {
          msg: 'O campo deve ser uma data válida.'
        },
        isAfterCreation(value){
          isAfterCreation(value, this);
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Environments',
    tableName: 'environments',
    timestamps: true
  });

  createImmutableField(Environments, 'id');
  createImmutableField(Environments, 'softwareType')

  return Environments;
};