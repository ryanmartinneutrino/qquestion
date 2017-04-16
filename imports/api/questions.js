import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'; 
import { FilesCollection } from 'meteor/ostrio:files';

export const Questions = new Mongo.Collection('questions');
export const Images = new Mongo.Collection("images");

export const ImagesFS = new FS.Collection("imagesfs", {
  stores: [new FS.Store.FileSystem("imagesfs")]
  //stores: [new FS.Store.GridFS("myImages")]
});

export const  ImagesMF = new FilesCollection({
  collectionName: 'ImagesMF',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});



if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    return Questions.find();
  });

  Meteor.publish('files.images.all', function () {
    return ImagesMF.find().cursor;
  });

  ImagesFS.allow({
    'insert': function () {
      // add custom authentication code here
     return true;
    },
    'update': function () {
      // add custom authentication code here
     return true;
    },
    'remove': function () {
      // add custom authentication code here
     return true;
    },
    'download': function () {
      // add custom authentication code here
     return true;
    },



  });

  Meteor.publish('images', function imagePublication() {
    return Images.find();
  });


}

Meteor.methods({
  'questions.insert'(question) {
    check(question.text, String);
    // Make sure the user is logged in before inserting a task
    //if (! this.userId) {
    //  throw new Meteor.Error('not-authorized');
    //}
    id = Questions.insert(question); 
    return id;
  },

  'questions.update'(question){
    Questions.update({_id:question._id},question);
  },
  
  'questions.delete'(qid){
    Questions.remove(qid);
  },

  'images.insert'(fileURL, filename){  
    id=Images.insert({fileURL:fileURL, filename:filename} );
    console.log("inserted image with id"+id);
  },
/*
  'images.insert'(file){
    id=Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    console.log("inserted image with id"+id);
  },*/
  'tasks.remove'(taskId) {
    check(taskId, String);
 
    Questions.remove(taskId);
  },
});




