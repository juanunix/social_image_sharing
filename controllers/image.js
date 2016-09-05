const   md5     = require('md5');
const   fs      = require('fs'),
        path    = require('path');

const   sidebar = require('../helpers/sidebar'),
        Models  = require('../models');

module.exports={
  index:   imageRender,
  create:  imageCreate,
  like:    imageLike,
  comment: imageComment,
  remove: imageRemove
};


function imageRender(req,res){
  var viewModel = {
    image : {},
    comments:[]
  };
  Models.Image.findOne({filename:{$regex:req.params.image_id}},function(err,image) {
    if(err){throw err;}
    if(image){
      image.views ++;
      viewModel.image=image;
      image.save();

      Models.Comment.find({image_id:image._id},{},{sort:{'timestamp':1}},
      function(err,comments) {
        if(err){throw err;}
        viewModel.comments = comments;
        sidebar(viewModel,(viewModel)=> {
          res.render('image',viewModel);
        });
      });
    }else{
      res.redirect('/');
    }
  });
}

function imageCreate(req,res){
  function saveImage() {
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgUrl = '';
    for (var i = 0; i < 6; i++) {
      imgUrl+=possible.charAt(Math.floor(Math.random()*possible.length));
    }
    //buscando coincidencias en el nombre
    Models.Image.find({filename:imgUrl},function(err,images) {
      if(err){throw err;}
      if(images.length>0){
        saveImage(); //recursive function - vuelve a ejecutar todo denuevo
      }else{//si no
        console.log(req.file);
        var tempPath = req.file.path,
        ext = path.extname(req.file.originalname).toLowerCase(),
        targetPath = path.resolve('./public/upload/' + imgUrl + ext);
        console.log(ext);
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ==='.gif') {
          fs.rename(tempPath, targetPath, function(err) {
            if (err){throw err;}
            var newImg=new Models.Image({
              title:req.body.title,
              description:req.body.description,
              filename:imgUrl+ext
            });
            newImg.save(function(err,image) {
              if(err){throw err;}
              console.log('imagen insertada satisfactoriamente: ',image.filename);
              res.redirect('/images/'+ image.uniqueId);
            });
          });
        } else {
          fs.unlink(tempPath, function (err) {
            if (err) throw err;
            res.status(500).json({err:'Solo se permiten imagenes'});
          });
        }
      }
    });
  }
  saveImage();
}


function imageLike(req,res){
  Models.Image.findOne({filename:{$regex:req.params.image_id}},function(err,image) {
    if(!err && image){
      // image.likes=image.likes+1;
      image.likes++;
      image.save(function(err) {
        if(err){
          res.json(err);
        }else{
          res.json({likes:image.likes});
        }
      });
    }
  });
}

function imageComment(req,res){
  Models.Image.findOne({filename:{$regex:req.params.image_id}},function(err,image) {
    if(!err && image){
      console.log(req.body);
      var newComment=new Models.Comment(req.body);//I pass the entire html form body in the constructor
      newComment.gravatar=md5(newComment.email);
      newComment.image_id=image._id;
      newComment.save(function(err,comment) {
        if(err){throw err;}
        res.redirect('/images/'+image.uniqueId+'#'+comment._id);
      });
    }else{
      res.redirect('/');
    }
  });
}

function imageRemove(req,res) {
  Models.Image.findOne({filename:{$regex:req.params.image_id}},
    function(err,image) {
    if(err) throw err;
    fs.unlink(path.resolve('./public/upload/'+image.filename),
      function(err) {
      if(err) throw err;
      Models.Comment.remove({image_id:image._id},
        function(err) {
        image.remove(function(err) {
          if(!err){
            res.json(true);
          }else{
            res.json(false);
          }
        });
      });
    });

  });
}
