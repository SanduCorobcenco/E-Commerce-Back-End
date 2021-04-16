const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const allProduct = await Product.findAll({
      include: [{ model: Category},
      { model: Tag,
        through: ProductTag,
        as: "tags"},
      ]
    });
    res.status(200).json(allProduct);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const allProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category },
      {
        model: Tag,
        through: ProductTag,
        as: "tags"
      },
      ]
    });

    if (!allProduct) {
      res.status(404).json({ message: `No product was found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(allProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

    try {
      const allProduct = await Product.create(req.body);
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: productData.id,
            tag_id,
          };
        });
        const allProduct = await ProductTag.bulkCreate(productTagIdArr);
        res.status(200).json(productTagIds);
      } else {
        res.status(200).json(allProduct);
      }
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });



// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
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
      })
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json(updatedProductTags);
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const results = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!results) {
      res.status(404).json({ message: `No product was found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
