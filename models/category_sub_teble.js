'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_sub_teble extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category_sub_teble.init({
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category_sub_teble',
  });
  return Category_sub_teble;
};