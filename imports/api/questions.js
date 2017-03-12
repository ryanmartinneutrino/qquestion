import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'; 

export const Questions = new Mongo.Collection('questions');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    return Questions.find();
  });
}

Meteor.methods({
  'questions.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    //if (! this.userId) {
    //  throw new Meteor.Error('not-authorized');
    //}
 
    id = Questions.insert({
      text:text,
      createdAt: new Date(),
      //owner: this.userId,
      //username: Meteor.users.findOne(this.userId).username,
    });
//    console.log("inserted from method with id ", id);
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
 
    Questions.remove(taskId);
  },
});




