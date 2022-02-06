const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({ //sequelize's findAll method
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    // find by its id
    where: {
      id: req.params.id
    },
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({ //Sequelize's create method
    tag_name: req.body.tag_name
  })
  .then(data => {
    res.json (data);
    if (err) res.status(500).send('create not valid');
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update( //Sequelize's update method
    //include all of tag's columns
    req.body,
    // single out tag by its id 
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ //sequelize's destory method 
    //by its id 
    where: {
      id: req.params.id
    }
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

module.exports = router;
