import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Questions } from '../api/questions.js';
import { Meteor } from 'meteor/meteor';

 
// App component - represents the whole app
export default class NewQuestionForm extends Component {

 handleSubmit(event){
  event.preventDefault();
  //Grab text from form
  const text = ReactDOM.findDOMNode(this.refs.htmltext).value.trim();

  //Build question and insert into database
  Meteor.subscribe('questions');
  Meteor.call('questions.insert', text);
  //  const newQ = { 'text':text };
  //  id =  Questions.insert(newQ);
  console.log("inserted question with  text: "+ text);
  // Clear form
  ReactDOM.findDOMNode(this.refs.htmltext).value = '';
 }

 render() {
    return (
      <div className='container'>
       <form  className='NewQuestion' onSubmit={this.handleSubmit.bind(this)} >
        <input type='textarea' ref='htmltext' placeholder='type your question' /> 
        <input type='submit' />
       </form>
      </div>
    );
  }
}





