const router = require('express').Router();
const petsRouter = require('../pets/routes');
const controller = require('./controller');

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.use('/:userId/pets', petsRouter);

module.exports = router;
