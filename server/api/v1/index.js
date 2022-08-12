const router = require('express').Router();

const pets = require('./pets/routes');
const applications = require('./applications/routes');
const users = require('./users/routes');

router.use('/pets', pets);
router.use('/applications', applications);
router.use('/users', users);

module.exports = router;
