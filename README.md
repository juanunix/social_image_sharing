Esta es una super modesta copia de Imgur.com

## Instalacion
 1. navega a la carpeta del proyecto
 2. npm install 
 3. npm start (asegurate de inicializar Mongodb con "./mongod")


### Dependencias usadas
- multer
- async

##tests
install mocha:
`npm install mocha -g` or `sudo npm install mocha -g`
The command to actually run tests is:
`$ mocha -r tests/testhelper.js -R spec tests/**/*.test.js` or `npm test`

###Gravatar
  Gravatar profile picture. Gravatar is a universal avatar
  service that stores profile pictures based on a user's e-mail address. However, the
  unique ID they use for each profile is an MD5 hash value, which is why we have
  to store that value.
