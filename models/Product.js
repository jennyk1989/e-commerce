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
    // id column -> int, NO null values, primary key, auto increment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // product_name column -> string, NO null values
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // price column -> decimal, no null values, validates value is decimal
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { isDecimal: true },
    },
    // stock column -> int, no null values, default value of 10, validates value is numeric
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { isNumeric: true },
    },
    // category_id column -> int, references the category model's id
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id',
      }
    }
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
