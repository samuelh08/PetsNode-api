const router = require('express').Router();
const petsRouter = require('../pets/routes');
const applicationsRouter = require('../applications/routes');
const repliesRouter = require('../replies/routes');
const controller = require('./controller');
const { auth, me } = require('../auth');
const { sanitizers } = require('./model');

router.param('id', controller.id);

router.route('/').get(controller.all);

router.route('/signup').post(sanitizers, controller.signup);
router.route('/login').post(sanitizers, controller.login);

router
  .route('/:id')
  .get(auth, me, controller.read)
  .put(auth, me, sanitizers, controller.update)
  .delete(auth, me, controller.delete);

router.use('/:userId/pets', petsRouter);
router.use('/:userId/applications', applicationsRouter);
router.use('/:userId/replies', repliesRouter);

module.exports = router;
