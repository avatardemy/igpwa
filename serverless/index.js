const Express = require('express');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');


const app = Express();
cloudinary.config({ 
  cloud_name: '', 
  api_key: '', 
  api_secret: '' 
});
const multipartMiddleware = multipart();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (request, response) => response.json({msg: 'Hello CL'}));

app.post('/upload', multipartMiddleware, (request, response) => {
  console.log('<==upload function got hit==>');
  console.log('<==REQUEST BODY: Image==>', request.body, request.files);
  cloudinary.v2.uploader.upload(request.files.image.path, (error, result) => {
    console.log('<==responding==>');
    if (error) {
      console.log ('<==ERROR==>', error);
      response.json(error); 
    } else {
      console.log ('<==RES==>', result);
      response.json(Object.assign({}, result, request.body)); 
    }
  });
})

module.exports = Webtask.fromExpress(app);