const router = require('express').Router();
const { Model } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // async findAll(options: object): Promise<Array<Model>>
  Category.findAll({ //sequelize's findAll() method
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then(data => {
    res.json(data);
    if (err) throw err;
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne ({ //sequelize's findOne method
    where: {
      // single out a category by its id
      id: req.params.id //using req.params instead of req.body bc its a /:id endpoint
    },
    // be sure to include its associated Products
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
  .then(data => {
    res.json(data);
    if (err) res.status(500).send('findOne query not valid');
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({ //Sequelize's create method
    //category model has a category_name column
    category_name: req.body.category_name
  })
  .then(data => {
    res.json(data);
    if (err) res.status(500).send('create method not valid');
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // async update(values: object, options: object): Promise<Array<number, number>>
  Category.update(
    //update category...
    {
      category_name: req.body.category_name
    },
    // ...by it's id value
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(data => {
    res.json(data);
    if (err) res.status(500).send('category update not successful');
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ //Sequelize's destroy method
    // single out category by its id 
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.json(data);
    if (err) res.status(500).send('category delete not successful');
  });
});

module.exports = router;
