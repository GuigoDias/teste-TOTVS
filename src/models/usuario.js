const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { createImmutableField } = require('../helpers/immutableFields.js');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Environments, {
        foreignKey: 'usuario_id',
      })
    }
  }
  Usuario.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "O campo nome não pode estar vazio."
        }
      }
    },
    squad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "O campo squad não pode estar vazio."
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    activeEnvironments: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: {
          args: 2,
          msg: "O número máximo de ambientes ativos é 2."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
  });

  createImmutableField(Usuario, 'uuid');
  createImmutableField(Usuario,'name');

  return Usuario;
};