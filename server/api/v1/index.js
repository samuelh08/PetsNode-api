const router = require('express').Router();

router.route('/pets').get((req, res, next) => {
  res.json({
    message: 'GET all pets',
  });
});

module.exports = router;
