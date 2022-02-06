const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({ //Sequelize's findAll method
    // be sure to include its associated Category and Tag data
    include: [
      {
        model: Category,
        // Category model columns include id & category_name
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        // Tag model columns: id, tag_name
        attributes: ['id', 'tag_name']
      }
    ]
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    // ...by it's id
    where: {
      id: req.params.id
    },
    // be sure to include its associated Category and Tag data
    include: [ 
      {
        model: Category,
        // Category model columns include id & category_name
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        // Tag model columns: id, tag_name
        attributes: ['id', 'tag_name']
      }
    ]
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(
    //returns all the columns in Product model
    req.body
  )
  .then((product) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    res.status(200).json(product);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
  
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({ //Sequelize's destroy method
    // single out a product by its id
    where: {
      id: req.params.id
    }
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

module.exports = router;
