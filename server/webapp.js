import {Images} from '../imports/api/questions.js';
import Busboy from 'busboy';


var fs = Npm.require('fs')

WebApp.connectHandlers.use('/upload/image',function(req,res,next){
  console.log("received a server request for file upload");

/*
  var files = [] // Store files in an array and then pass them to request.
  var image = {} // crate an image object

  var busboy = new Busboy({ headers: req.headers })
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    image.mimeType = mimetype
    image.encoding = encoding

    var buffers = []
    file.on('data', function (data) {
      buffers.push(data)
    })
    file.on('end', function () {
      image.data = Buffer.concat(buffers)
      console.log(image);
      files.push(image)
      })
   });

  // busboy.on('field', function (fieldname, value) {
  //   req.body[fieldname] = value
  // });

   busboy.on('finish', function () {
     req.files = files
     next()
   });
   req.pipe(busboy)

*/
  //console.log(req);
  response = {
    "uploaded": 1,
    "fileName": "testfile.png",
    "url": "/cfs/files/images/testfile.png"
  }
  var file = fs.createWriteStream("/home/rmartin/qquestion/testfile.png");
  req.pipe(file); 
  //console.log(file);
  res.end(JSON.stringify(response));
});
