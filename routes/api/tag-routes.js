const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTag = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "products" }]
    });
    res.status(200).json(allTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const allTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "products" }]
    });

    if (!allTag) {
      res.status(404).json({ message: `No tag was found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(allTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const allTag = await Tag.create(req.body);
    res.status(200).json(allTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Tag model requires "tag_name"
router.put('/:id', async (req, res) => {
  try {
    const allTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!allTag) {
      res.status(404).json({ message: `No tag was found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(allTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const results = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!results) {
      res.status(404).json({ message: `No tag was found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
