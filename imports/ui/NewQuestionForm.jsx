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
  const text = CKEDITOR.instances["editor_1"].getData();
  const solution = CKEDITOR.instances["editor_2"].getData();
  const type = ReactDOM.findDOMNode(this.refs.type).value  
  console.log("The type is "+type);
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

 handleTypeChange(changeEvent){
  value = changeEvent.target.value;
  this.setState({question: {type: value}} );
 }

  handlePublicChange(changeEvent){
  value = changeEvent.target.checked;
  this.setState({question: {isPublic: value}} );
 }



 render() {
    return (
      <div className='container'>
       <form  className='NewQuestion' onSubmit={this.handleSubmit.bind(this)} >
        <input type="radio" value="MC" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MC"} /> Multiple Choice  
        <input type="radio" value="MS" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MS"} /> Multi Select  
        <input type="radio" value="TF" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "TF"} /> True/Fals  
        <input type="radio" value="SA" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "SA"} /> Short Answer <br/>
        <input type="checkbox" onChange={this.handlePublicChange.bind(this)} checked={this.state.question.public}  value={true} /> Public <br/>
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





