const express = require('express');
const router = express.Router();
const painelSAM = require('../services/painelSAM');

/* GET occurrences. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await painelSAM.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting occurrences`, err.message);
    next(err);
  }
});

/* POST occurrences */
router.post('/', async function(req, res, next) {
    try {
      console.log(req.body);
      res.json(await painelSAM.create(req.body));
    } catch (err) {
      console.error(`Error while creating occurrence`, err.message);
      next(err);
    }
  });

/* PUT occurrences */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await painelSAM.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating occurrence`, err.message);
      next(err);
    }
  });

/* DELETE occurrences */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await painelSAM.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting occurrence`, err.message);
      next(err);
    }
  });
  
module.exports = router;