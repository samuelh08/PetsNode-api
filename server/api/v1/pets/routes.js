const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');

router.param('id', controller.id);

router
  .route('/')
  .post(controller.parentId, controller.create)
  .get(controller.parentId, controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.parentId, controller.read)
  .put(controller.parentId, controller.update)
  .delete(controller.parentId, controller.delete);

module.exports = router;
