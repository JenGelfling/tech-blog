// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// // const Model = sequelize.Model;
// class Reviews extends Model {}

// Reviews.init(
//   {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     },
//     author_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'users',
//           key: 'id'
//         }
//     },
//     like_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: 'likes',
//           key: 'id'
//         }
//     },
//     // movie_id: {
//     //     type: DataTypes.INTEGER,
//     //     allowNull: false,
//     //     references: {
//     //       model: 'movies',
//     //       key: 'id'
//     //     }
//     // },
//     is_public: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true
//     },
//     score: {
//       type: DataTypes.STRING,
//       allowNull: true,
//   }
//   },
//   {
//     sequelize,
//     timestamps: true,
//     underscored: true,
//     modelName: 'reviews',
//     freezeTableName: true
//   }
// );

// module.exports = Reviews;

// --------------------------

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      index: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
