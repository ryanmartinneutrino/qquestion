import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Questions } from '../api/questions.js';
import { Meteor } from 'meteor/meteor';
import CKEditor from './CKEditor.jsx';
import QuestionPreview from './QuestionPreview.jsx';

const emptyQuestion = {createdAt:"", text:"", type:"MC", isPublic:true, solution:"", tags:[]};
 
export default class QuestionEdit extends Component {

 constructor(props) {
   super(props);
   question = emptyQuestion;
   if (this.props.question){
     question=this.props.question;
   }
   this.state = {
        question:question,
   }
  };

 handleSave(event){
  event.preventDefault();
  let question = this.state.question;

  if (question._id){
    question.updatedAt= new Date();
    Meteor.call('questions.update', question);
    console.log("updated question");
    FlowRouter.go('editor/_id', {_id:this.state.question._id});
  }else{
    question.createdAt= new Date();
    Meteor.call('questions.insert', question, function(error, result){
      question._id=result
      this.setState({question: question} );
      console.log("inserted question with id"+question._id );
    FlowRouter.go('editor/_id', {_id:this.state.question._id});
    }.bind(this));
  }
 }

 handleSaveAndNew(event){
 //TODO: This does not work, it still remembers the old question.
  event.preventDefault();
  let question = this.state.question;

  if (question._id){
    question.updatedAt= new Date();
    Meteor.call('questions.update', question, function(error,result){
      console.log("updated question");
      this.setState({question: emptyQuestion} );
      FlowRouter.go('/editor');      
    }.bind(this));
  }else{
    question.createdAt= new Date();
    Meteor.call('questions.insert', question, function(error, result){
      question._id=result
      console.log("inserted question with id"+question._id );
      this.setState({question: emptyQuestion} );
      FlowRouter.go('/editor');
    }.bind(this));
  }
  //this.setState({question: emptyQuestion} );
  //FlowRouter.go('/editor');
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
          <div className="panel-heading">{this.state.question._id ? "Edit Question" : "New Question"}</div>
          <div className="panel-body">

            <form  className='NewQuestion'  >
              <input type="radio" name="type" value="MC" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MC"} /> Multiple Choice  
              <input type="radio" name="type" value="MS" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "MS"} /> Multi Select  
              <input type="radio" name="type" value="TF" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "TF"} /> True/False  
              <input type="radio" name="type" value="SA" onChange={this.handleTypeChange.bind(this)} checked={this.state.question.type === "SA"} /> Short Answer <br/>
              <input type="checkbox" name="isPublic" onChange={this.handlePublicChange.bind(this)} checked={this.state.question.public}  value={true} /> Public <br/>
              Tags (comma separated): <input type="text" name="tags" onChange={this.handleTagsChange.bind(this)}  />
              <h3> Type question: </h3>
              <CKEditor id={1} inline={false} onChange={this.handleCKEditorChangeQuestion.bind(this)} data={this.state.question.text} />
              <h3> Type solution: </h3>
              <CKEditor id={2} inline={true} onChange={this.handleCKEditorChangeSolution.bind(this)} data={this.state.question.solution} />
             <button className='btn btn-default' onClick={this.handleSave.bind(this)} > Save </button>
             <button className='btn btn-default' onClick={this.handleSaveAndNew.bind(this)} > Save and New </button>
           </form>

           <QuestionPreview question={this.state.question} />
         </div>
       </div>
    );
  }
}





