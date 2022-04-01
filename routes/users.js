const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET users. */
router.get('/', async function(req, res, next) {
    try {
      res.json(await users.login(req.query.page));
    } catch (err) {
      console.error(`Error while getting users`, err.message);
      next(err);
    }
  });
  
/* POST users */
router.post('/', async function(req, res, next) {
    try {
      console.log(req.body);
      res.json(await users.create(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  });

  /* PUT users */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await users.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
  });

  /* DELETE users */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await users.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting user`, err.message);
      next(err);
    }
  });

  module.exports = router;
