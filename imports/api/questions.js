import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'; 

export const Questions = new Mongo.Collection('questions');
export const Images = new Mongo.Collection("images");
/*export const Images = new FS.Collection("images", {
// stores: [new FS.Store.FileSystem("images", {path: "/home/rmartin/qlicker/uploads"})]
  stores: [new FS.Store.GridFS("myImages")]
});
*/


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    return Questions.find();
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
  /*
    id = Questions.insert(
      text:text,
      createdAt: new Date(),
      //owner: this.userId,
      //username: Meteor.users.findOne(this.userId).username,
    });*/
//    console.log("inserted from method with id ", id);
  },
  'images.insert'(fileURL, filename){  
    id=Images.insert({fileURL:fileURL, filename:filename} );
    console.log("inserted image with id"+id);
  },

  'tasks.remove'(taskId) {
    check(taskId, String);
 
    Questions.remove(taskId);
  },
});




