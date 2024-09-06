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
      createdAt: "createAt",
      updatedAt: "updatedAt",
    },
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
