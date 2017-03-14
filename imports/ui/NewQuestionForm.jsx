import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Questions } from '../api/questions.js';
import { Meteor } from 'meteor/meteor';
import CKEditor from './CKEditor.jsx';

 
export default class NewQuestionForm extends Component {

 handleSubmit(event){
  event.preventDefault();
  const text = CKEDITOR.instances["editor_1"].getData();
  //Build question and insert into database
  Meteor.subscribe('questions');
  Meteor.call('questions.insert', text);
  console.log("inserted question with  text: "+ text);
  // Clear form
  CKEDITOR.instances["editor_1"].setData("");
 }

 render() {
    return (
      <div className='container'>
       <form  className='NewQuestion' onSubmit={this.handleSubmit.bind(this)} >
        <h3> Type question: </h3>
        <CKEditor id={1} />
        <input type='submit' />
       </form>
      </div>
    );
  }
}





