import React, { Component } from 'react';
import HtmlView from './HtmlView.jsx'; 
import TagsInput from 'react-tagsinput' 



export default class QuestionPreview extends Component {

  componentDidMount () {
    div_id="qprev_new"
    if(this.props.question._id) div_id="qprev_"+this.props.question._id
    console.log("preview mount: "+div_id)
    if(this.props.question)  MathJax.Hub.Queue(['Typeset', MathJax.Hub,div_id])
  }

  componentDidUpdate () {
    div_id="qprev_new"
    if(this.props.question._id) div_id="qprev_"+this.props.question._id
    console.log("preview update: "+div_id)
    if(this.props.question) MathJax.Hub.Queue(['Typeset', MathJax.Hub,div_id])
  }

  handleDelete(evt){
    if(this.props.question){
      console.log("deleting question "+this.props.question._id);
      Meteor.call('questions.delete', this.props.question._id);
    }
    else{
      console.log("no question to delete");
    }
  };

  handleEdit(evt){

  }

  handleTagsChange(tags){
    if(this.props.question){
      console.log("updating question tags "+this.props.question._id);
      Meteor.call('questions.updateTags', this.props.question._id, tags);
    }
    else{
      console.log("no question to delete");
    }
  
  }

  render() {
   question = this.props.question;// ? this.props.questions : {text:'no question in db'} ;
   div_id="qprev_new"
   if(question._id) div_id="qprev_"+this.props.question._id
   if(!question){
    return( <div className='container'>Loading...</div>);
   }
   else{
    //Show delete button only if the question has an id (i.e. it's from the database, not the editor)
    deleteButton = null;
    editButton = null;
    if (question._id){
      deleteButton = <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this)} >
             <span className="glyphicon glyphicon-remove" ></span>
           </button> ;
      editButton = <a href={"/editor/"+question._id} >
             <span className="glyphicon glyphicon-edit" ></span>
           </a> ;

    }
    return (
      <div id={div_id} className='panel panel-default'>
        <div className="panel-heading">
           {deleteButton} {editButton} <br /> 
           Question: {this.props.question._id} <br />
           <TagsInput value = {this.props.question.tags} onChange={this.handleTagsChange.bind(this)} />
           <HtmlView html={this.props.question.text} />
        </div>
        <div className="panel-body">
          <HtmlView html= {this.props.question.solution } />
        </div>
      </div>
    );

   }
  }
};






