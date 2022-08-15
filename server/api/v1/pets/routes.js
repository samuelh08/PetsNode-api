const router = require('express').Router({
  mergeParams: true,
});
const applicationsRouter = require('../applications/routes');
const controller = require('./controller');
const { auth, owner } = require('../auth');

router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.parentId, controller.create)
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  .get(auth, controller.parentId, controller.read)
  .put(auth, owner, controller.parentId, controller.update)
  .delete(auth, owner, controller.parentId, controller.delete);

router.use('/:petId/applications', applicationsRouter);

module.exports = router;
