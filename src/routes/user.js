const express = require('express');

const User = require('../controllers/user');
const validate = require('../middlewares/validate');

const router = express.Router();

//INDEX
router.get('/', User.index);

//SHOW
router.get('/:id',  User.show);
module.exports = router;