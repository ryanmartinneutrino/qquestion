import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Questions } from '../api/questions.js';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CKEditor from './CKEditor.jsx';
import QuestionPreview from './QuestionPreview.jsx';
import TagsInput from 'react-tagsinput'
 
export class QuestionEdit extends Component {

 constructor(props) {
   super(props);
  };


 componentWillMount(){
   this.setState( { question: this.props.question});  
 }

 componentWillReceiveProps(nextProps){
 //typically called once the question has loaded from the db
   this.setState({question: nextProps.question});
 }

 handleSave(event){
  event.preventDefault();
  let question = this.state.question;

  if (question._id){
    question.updatedAt= new Date();
    Meteor.call('questions.update', question);
    //console.log("updated question");
    FlowRouter.go('editor/_id', {_id:this.state.question._id});
  }else{
    question.createdAt= new Date();
    Meteor.call('questions.insert', question, function(error, result){
      question._id=result
      this.setState({question: question} );
      //console.log("inserted question with id"+question._id );
      FlowRouter.go('editor/_id', {_id:this.state.question._id});
    }.bind(this));
  }
 }

 handleSaveAndNew(event){
  event.preventDefault();
  var emptyQuestion = { createdAt:"", text:"", type:"MC", isPublic:true, solution:"", tags:[]};
  let question = this.state.question;

  if (question._id){
    question.updatedAt= new Date();
    Meteor.call('questions.update', question, function(error,result){
      //console.log("updated question");
      this.setState({question: emptyQuestion} );
      FlowRouter.go('editor/_id', {_id:this.state.question._id});
    }.bind(this));
  }else{
    question.createdAt= new Date();
    Meteor.call('questions.insert', question, function(error, result){
      question._id=result
      //console.log("inserted question with id"+question._id );
      this.setState({question: emptyQuestion} );
      FlowRouter.go('/editor');
    }.bind(this));
  }
   CKEDITOR.instances["editor_QuestionText"].setData("");
   CKEDITOR.instances["editor_SolutionText"].setData("");
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


 handleTagsChange(tags){
  let question = this.state.question;
  question.tags=tags;
  //value = changeEvent.target.value;
  //question.tags = value.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/);;
  ////console.log(question.tags);
  this.setState({question: question} );

 }

 render() {

    if(this.props.loading || !this.state.question){
      return (<div> Loading </div>);
    }
    else{
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
              <TagsInput onChange={this.handleTagsChange.bind(this)} value={this.state.question.tags} />
              <h3> Type question: </h3>
              <CKEditor id={"QuestionText"} inline={false} onChange={this.handleCKEditorChangeQuestion.bind(this)} data={this.state.question.text} />
              <h3> Type solution: </h3>
              <CKEditor id={"SolutionText"} inline={true} onChange={this.handleCKEditorChangeSolution.bind(this)} data={this.state.question.solution} />
             <button className='btn btn-default' onClick={this.handleSave.bind(this)} > Save </button>
             <button className='btn btn-default' onClick={this.handleSaveAndNew.bind(this)} > Save and New </button>
           </form>

           <QuestionPreview question={this.state.question} />
         </div>
       </div>
    )
   }
  }
}


QuestionEdit.propTypes = {
  question: React.PropTypes.object,
  loading: React.PropTypes.bool,
};

//This is not setting this.props once the question has loaded...
export default QuestionEditContainer =  createContainer( () => {
  var emptyQuestion = { createdAt:"", text:"", type:"MC", isPublic:true, solution:"", tags:[]};
  qid = FlowRouter.getParam("_id");
  var loading = false;
  let question = emptyQuestion;
  if (qid){
    console.log("loading question from db "+qid);
    qhandle = Meteor.subscribe('questions');
    loading = !qhandle.ready()
    question = Questions.findOne({_id:qid});
  }
  return {
    question: question,
    loading: loading,
  };
}, QuestionEdit);


