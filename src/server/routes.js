const express = require('express'),
      home = require('../controllers/home'),
      image = require('../controllers/image'),
      router = express.Router();

module.exports = function(app){

  router.get('/', home.index);
  router.get('/images/:image_id', image.index);
  router.post('/images', image.create);
  router.post('/images/:image_id/like', image.like);
  router.post('/images/:image_id/comment', image.comment);
  router.delete('/images/:image_id',image.remove);

  app.use(router);

};
