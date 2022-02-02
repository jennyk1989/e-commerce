const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

// Models can be defined by extending Model and calling init(attributes, options)
Category.init(
  // attributes
  {
    // define columns
    // id column -> integer, NO null values, primary key, auto increment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // TODO: category_name column -> string, NO null values
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  // options
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
