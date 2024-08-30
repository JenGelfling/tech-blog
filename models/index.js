
const Users = require('./Users');
const Reviews = require('./Reviews');
const Likes = require('./Likes');

// A movie can have many reviews
Likes.hasMany(Reviews, {
  foreignKey: 'like_id',
  onDelete: 'CASCADE'
});

// A review belongs to one movie
Reviews.belongsTo(Likes, {
  foreignKey: 'like_id'
});

// A review belongs to one user
Reviews.belongsTo(Users, {
  foreignKey: 'author_id'
});

// A user can have many reviews
Users.hasMany(Reviews, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

module.exports = { Users, Reviews, Likes };