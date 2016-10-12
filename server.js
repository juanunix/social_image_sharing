const express   = require('express'),
      mongoose  = require('mongoose');
const config    = require('./server/config');

var app=express();
app = config(app);

//BD

// mongoose.connect('mongodb://localhost/social-image-sharer');
mongoose.connect('mongodb://fabian:socialimage@ds057066.mlab.com:57066/social-image-sharing');

mongoose.connection.on('open',()=>{
  console.log('mongoose connected');
});
//Server
const server = app.listen(app.get('port'), ()=> {
  console.log('Server up: http://localhost:' + app.get('port'));
});




/*
    You can set any number of environment variables rigth from the command line before you
    run your server by executing something like the following command:
    $ PORT=5500 node server.js

    Puedes configurar las variables de entorno antes de que correr tu servidor
    corriendo el siguiente comando en la linea de comandos:
    $ PORT=5500 node server.js
*/
