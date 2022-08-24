const router = require('express').Router({
  mergeParams: true,
});
const applicationsRouter = require('../applications/routes');
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model');

router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.parentId, sanitizers, controller.create)
  .get(controller.parentId, controller.all);

router
  .route('/:id')
  .get(controller.parentId, controller.read)
  .put(auth, owner, controller.parentId, sanitizers, controller.update)
  .delete(auth, owner, controller.parentId, controller.delete);

router.use('/:petId/applications', applicationsRouter);

module.exports = router;
