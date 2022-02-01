// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // TODO: id column -> int, NO null values, primary key, auto increment

    // TODO: product_name column -> string, NO null values

    // TODO: price column -> decimal, no null values, validates value is decimal

    // TODO: stock column -> int, no null values, default value of 10, validates value is numeric

    // TODO: category_id column -> int, references the category model's id
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
