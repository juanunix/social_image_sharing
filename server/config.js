const path            = require('path');
const express         = require('express'),
      exphbs          = require('express-handlebars'),
      bodyParser      = require('body-parser'),
      cookieParser    = require('cookie-parser'),
      morgan          = require('morgan'),
      methodOverride  = require('method-override'),
      moment          = require('moment'),
      errorHandler    = require('errorhandler'),
      multer          = require('multer'),
      favicon         = require('serve-favicon');
const routes          = require('./routes');

module.exports = (app)=>{
  app.disable('x-powered-by');

  app.set('port',process.env.PORT || 3000);
  app.set('views',path.join(__dirname ,'../views'));

  app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended':true}));
  app.use(bodyParser.json());
  app.use(multer({dest:path.join(__dirname,'public/upload/temp')}).single('file'));
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));

  routes(app);//routes in routes file- las rutas estan en la capeta file.

  app.use('/public/', express.static(path.join(__dirname,'../public')));

  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }
  //rendering
  app.engine('handlebars',exphbs.create({
   defaultLayout:'main',
   layoutsDir:app.get('views')+'/layouts',
   partialsDir:[app.get('views')+'/partials'],
   helpers:{
   	timeago:function(timestamp) {//global helpers
   		return moment(timestamp).startOf('minute').fromNow();
   	},
    currentYear:function() {
      return new Date().getFullYear();
    }
   }
  }).engine);

  app.set('view engine','handlebars');

  return app;
};
