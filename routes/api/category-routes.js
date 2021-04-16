const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCathegories = await Category.findAll({
      include: [ 
        {
          model: Product,
        },
      ],
    });
    return res.status(200).json(allCathegories);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const allCathegories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!allCathegories) {
      res.status(404).json({ message: `No category found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(allCathegories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const allCathegories = await Category.create(req.body);
    res.status(200).json(allCathegories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const allCathegories = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!allCathegories) {
      res.status(404).json({ message: `No category was found with id ${req.params.id}`})
      return;
    }
    res.status(200).json(allCathegories); } 
    catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const results = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!results) {
      res.status(404).json({ message: `No category was found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;