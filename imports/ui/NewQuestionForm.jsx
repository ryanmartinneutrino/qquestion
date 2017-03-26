import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Questions } from '../api/questions.js';
import { Meteor } from 'meteor/meteor';
import CKEditor from './CKEditor.jsx';
import QuestionPreview from './QuestionPreview.jsx';

 
export default class NewQuestionForm extends Component {

 constructor(props) {
   super(props);
   this.state = {
        question:{text:""},
   }
  };

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

 handleCKEditorChange(data){
  this.setState({question: {text: data}} );
 }

 render() {
    return (
      <div className='container'>
       <form  className='NewQuestion' onSubmit={this.handleSubmit.bind(this)} >
        <h3> Type question: </h3>
        <CKEditor id={1} inline={false} onChange={this.handleCKEditorChange.bind(this)} />
        <h3> Solution </h3>
        <CKEditor id={2} inline={true} onChange={this.handleCKEditorChange.bind(this)} />
        <input className='btn btn-default' type='submit' />
       </form>
      <h3> preview </h3>
      <QuestionPreview question={this.state.question} />
      </div>
    );
  }
}





