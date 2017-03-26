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
        question:{text:"", type:"MC", isPublic:true, solution:""},
   }
  };

 handleSubmit(event){
  event.preventDefault();
  //Build question and insert into database
  Meteor.subscribe('questions');
  Meteor.call('questions.insert', this.state.question.text);
  console.log("inserted question with  text: "+ this.state.question.text);
  // Clear form
  CKEDITOR.instances["editor_1"].setData("");
  CKEDITOR.instances["editor_2"].setData("");
 }

 handleCKEditorChange(data){
  let question = this.state.question;
  question.text=data;
  this.setState({question: question} );
 }

 handleTypeChange(changeEvent){
  let question = this.state.question;
  value = changeEvent.target.value;
  question.type=value;
  this.setState({question: question});
 }

  handlePublicChange(changeEvent){
  let question = this.state.question;
  value = changeEvent.target.checked;
  question.isPublic=value;
  this.setState({question: question} );
 }



 render() {
    return (
      <div className='container'>
       <form  className='NewQuestion' onSubmit={this.handleSubmit.bind(this)} >
        <input type="radio" name="type" value="MC" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MC"} /> Multiple Choice  
        <input type="radio" name="type" value="MS" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MS"} /> Multi Select  
        <input type="radio" name="type" value="TF" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "TF"} /> True/False  
        <input type="radio" name="type" value="SA" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "SA"} /> Short Answer <br/>
        <input type="checkbox" name="isPublic" onChange={this.handlePublicChange.bind(this)} checked={this.state.question.public}  value={true} /> Public <br/>
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





