import {ImagesFS} from '../imports/api/questions.js';
import Busboy from 'busboy';


var fs = Npm.require('fs')

WebApp.connectHandlers.use('/upload/image',function(req,res,next){
  console.log("received a server request for file upload");

 // console.log(req._readbleState);
/*
  //This gets the raw data
  var body = "";
  req.on('data', Meteor.bindEnvironment(function (data) {
    body += data;
  }));

  req.on('end', Meteor.bindEnvironment(function () {
    console.log(body);
  }));

*/


  fileNames = [];
  var busboy = new Busboy({ headers: req.headers })
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var fileDisk = fs.createWriteStream("/home/rmartin/qquestion/upload"+filename);
    file.pipe(fileDisk);
    fileNames.push(filename);
  });

  busboy.on('finish', function () {
     res.writeHead(200);
     response = {
      "uploaded": 1,
      "fileName": fileNames[0],
      "url": fileNames[0], //ImagesFS.findOne({filename:fileNames[0]}).url({brokenIsFine:true}),
      };

     res.end(JSON.stringify(response));
   });
  req.pipe(busboy)

});
