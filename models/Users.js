const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Model = sequelize.Model; 
const bcrypt = require("bcrypt")

class Users extends Model {
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },


    username: {
      type: DataTypes.STRING,
      allowNull: true

    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 15]
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (userdata) => {
        userdata.password = await bcrypt.hash(userdata.password, 10);
        return userdata;
      },
      beforeUpdate: async (userdata) => {
        if (userdata.changed('password')) {
          userdata.password = await bcrypt.hash(userdata.password, 10);
        }
        return userdata;
      }
    },
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'users',
    freezeTableName: true
  }
);

module.exports = Users;