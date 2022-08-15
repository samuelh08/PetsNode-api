const router = require('express').Router();
const petsRouter = require('../pets/routes');
const applicationsRouter = require('../applications/routes');
const controller = require('./controller');
const { auth, me } = require('../auth');

router.param('id', controller.id);

router.route('/').get(controller.all);

router.route('/signup').post(controller.signup);

router.route('/login').post(controller.login);

router
  .route('/:id')
  .get(auth, me, controller.read)
  .put(auth, me, controller.update)
  .delete(auth, me, controller.delete);

router.use('/:userId/pets', petsRouter);
router.use('/:userId/applications', applicationsRouter);

module.exports = router;
