const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Model = sequelize.Model; 
class Likes extends Model {}

Likes.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    review_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // genre: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // released: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // plot: {
    //     type: DataTypes.TEXT,
    //     allowNull: true
    // },
    // year: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // director: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // rated: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // runtime: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // actors: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // language: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // poster: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // imdbRating: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // boxoffice: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'likes',
    freezeTableName: true
  }
);

module.exports = Likes;