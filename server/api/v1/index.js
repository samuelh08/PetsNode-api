const router = require('express').Router();

const pets = require('./pets/routes');

router.use('/pets', pets);

module.exports = router;
