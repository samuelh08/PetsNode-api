const router = require('express').Router();
const petsRouter = require('../pets/routes');
const controller = require('./controller');

router.route('/').get(controller.all);

router.route('/signup').post(controller.signup);

router.route('/login').post(controller.login);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.use('/:userId/pets', petsRouter);

module.exports = router;
