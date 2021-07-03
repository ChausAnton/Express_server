'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    author: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'inactive')
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};