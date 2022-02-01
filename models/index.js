// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// TODO: Products belongs to Category, as a category can have multiple
// products but a product can only belong to one category

// Category has many Product models

// Products belongs to many Tag models. Using the ProductTag through model,
// allow products to have mulitple tags & tags to have many products

// Tags belongs to many Product models

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
