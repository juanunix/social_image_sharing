const models = require('../models');
const async  = require('async');

module.exports = {
  newest: newest
};

var attackImage=function(comment,next) {
  models.Image.findOne({_id:comment.image_id},function(err,image) {
    if(err){throw err;}
    comment.image=image;
    next(err); //callback executes the 'next' item in the array
  });
};

function newest(callback){
  models.Comment.find({},{},{limit:5,sort:{'timestamp':-1}},
    function(err,comments) {
      //loop through every comment in the comments array
      async.each(comments,attackImage,function(err) {
        if(err){throw err;}
        callback(err,comments);
      });
  });
}
