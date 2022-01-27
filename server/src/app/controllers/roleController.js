const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Role = require('../models/role');
const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try { 
    const roles = await Role.find();

    res.send({ roles });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading roles' });
  }
});

router.post('/createRole', async (req, res) => {
  try {
    const role = await Role.create({ ...req.body });

    return res.send({ role });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating role' });
  }
});

router.delete('/deleteRole/:roleId', async (req, res) => {
  try {
    const role = await Role.findByIdAndRemove(req.params.roleId);

    return res.send({ removed_user: role });
  } catch (err) {
    return res.status(400).send({ error: 'Error delting new role' });
  }
});


module.exports = app => app.use('/roles', router);