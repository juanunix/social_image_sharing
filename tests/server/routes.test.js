esvar home = require('../../controllers/home');
var image = require('../../controllers/image');
var routes = require('../../server/routes');

describe('Routes',function() {
  var app = {
    get:sinon.spy(),
    post:sinon.spy(),
    delete:sinon.spy()
  };

  beforeEach(function() {
    routes(app);
  });

  describe('GETs',function(){
    it('should handle /',function() {
      expect(app.get).to.be.equal('/',home.index);
    });
    it('should handle /images/:image_id',function() {
      expect(app.get).to.be.equal('/images/:image_id',image.index);
    });
  });


});
