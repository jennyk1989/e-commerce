const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    // TODO: id column -> int, no null values, primary key, auto increment

    // TODO: product_id column -> int, references the product model's id

    // TODO: tag_id column -> int, references the tag model's id
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
