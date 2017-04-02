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
        question:{createdAt:"", text:"", type:"MC", isPublic:true, solution:"", tags:[]},
   }
  };

 handleSubmit(event){
  event.preventDefault();
  let question = this.state.question;
  question.createdAt= new Date();
  //Might not need these as onChange() of CKEditor should keep them up to date:
  //question.text=CKEDITOR.instances["editor_1"].getData();
  //question.solution=CKEDITOR.instances["editor_2"].getData();

  //Build question and insert into database
//  Meteor.subscribe('questions');
  Meteor.call('questions.insert', question);
  console.log("inserted question ");
  // Clear form
  question={createdAt:"", text:"", type:"MC", isPublic:true, solution:"", tags:[]}
  this.setState({question: question} );
  CKEDITOR.instances["editor_1"].setData("");
  CKEDITOR.instances["editor_2"].setData("");
 }

 handleCKEditorChangeQuestion(data){
  let question = this.state.question;
  question.text=data;
  this.setState({question: question} );
 }

 handleCKEditorChangeSolution(data){
  let question = this.state.question;
  question.solution=data;
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

 handleTagsChange(changeEvent){
  let question = this.state.question;
  value = changeEvent.target.value;
  question.tags = value.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/);;
  console.log(question.tags);
  this.setState({question: question} );

 }

 render() {
    return (
        <div className='panel panel-primary'>
          <div className="panel-heading">New Question</div>
          <div className="panel-body">

            <form  className='NewQuestion' onSubmit={this.handleSubmit.bind(this)} >
              <input type="radio" name="type" value="MC" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MC"} /> Multiple Choice  
              <input type="radio" name="type" value="MS" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MS"} /> Multi Select  
              <input type="radio" name="type" value="TF" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "TF"} /> True/False  
              <input type="radio" name="type" value="SA" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "SA"} /> Short Answer <br/>
              <input type="checkbox" name="isPublic" onChange={this.handlePublicChange.bind(this)} checked={this.state.question.public}  value={true} /> Public <br/>
              Tags (comma separated): <input type="text" name="tags" onChange={this.handleTagsChange.bind(this)}  />
              <h3> Type question: </h3>
              <CKEditor id={1} inline={false} onChange={this.handleCKEditorChangeQuestion.bind(this)} />
              <h3> Type solution: </h3>
              <CKEditor id={2} inline={true} onChange={this.handleCKEditorChangeSolution.bind(this)} />
             <input className='btn btn-default' type='submit' />
           </form>

           <QuestionPreview question={this.state.question} />
         </div>
       </div>
    );
  }
}





