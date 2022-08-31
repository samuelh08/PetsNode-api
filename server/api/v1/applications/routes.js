const router = require('express').Router({
  mergeParams: true,
});
const repliesRouter = require('../replies/routes');
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model');

router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.parentId, sanitizers, controller.create)
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  .get(auth, controller.parentId, controller.read)
  .put(auth, owner, controller.parentId, sanitizers, controller.update)
  .delete(auth, owner, controller.parentId, controller.delete);

router.use('/:applicationId/replies', repliesRouter);

module.exports = router;
