// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// // const Model = sequelize.Model;
// const bcrypt = require("bcrypt")

// class Users extends Model {
//   async validatePassword(password) {
//     return await bcrypt.compare(password, this.password);
//   }
// }

// Users.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true
//     },

//     username: {
//       type: DataTypes.STRING,
//       allowNull: true

//     },

//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },

//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [5, 15]
//       }
//     }
//   },
//   {
//     hooks: {
//       beforeCreate: async (userdata) => {
//         userdata.password = await bcrypt.hash(userdata.password, 10);
//         return userdata;
//       },
//       beforeUpdate: async (userdata) => {
//         if (userdata.changed('password')) {
//           userdata.password = await bcrypt.hash(userdata.password, 10);
//         }
//         return userdata;
//       }
//     },
//     sequelize,
//     timestamps: true,
//     underscored: true,
//     modelName: 'users',
//     freezeTableName: true
//   }
// );

// module.exports = Users;

// -----------------------

const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        if (updatedUserData.password && updatedUserData.password.length > 0) {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
