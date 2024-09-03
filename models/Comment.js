// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// // const Model = sequelize.Model;
// class Likes extends Model {}

// Likes.init(
//   {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     review_id: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     // genre: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // released: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // plot: {
//     //     type: DataTypes.TEXT,
//     //     allowNull: true
//     // },
//     // year: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // director: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // rated: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // runtime: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // actors: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // language: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // poster: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // imdbRating: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//     // boxoffice: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true
//     // },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     underscored: true,
//     modelName: 'likes',
//     freezeTableName: true
//   }
// );

// module.exports = Likes;

// --------------------

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
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
    modelName: "comment",
  }
);

module.exports = Comment;
