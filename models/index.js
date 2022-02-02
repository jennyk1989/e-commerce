// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongs to Category, as a category can have multiple
// products but a product can only belong to one category
Product.belongsTo(Category, { //Products belongs to Category model
  foreignKey: 'category_id' // Product category_id references the category model's id
});
// Category has many Product models
Category.hasMany(Product, {
  foreignKey: 'category_id' 

})
// Products belongs to many Tag models. Using the ProductTag through model,
// allow products to have mulitple tags & tags to have many products
Product.belongsToMany(Tag, {
  through: ProductTag, //through model
  foreignKey: 'product_id' 
})
// Tags belongs to many Product models
Tag.belongsToMany(Product, {
  through: ProductTag, //uses ProductTag through model
  foreignKey: 'tag_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
