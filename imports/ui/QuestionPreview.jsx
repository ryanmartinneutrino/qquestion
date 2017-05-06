import React, { Component } from 'react';
import HtmlView from './HtmlView.jsx'; 
import TagsInput from 'react-tagsinput' 
// App component - represents the whole app
export default class QuestionPreview extends Component {

 componentDidUpdate () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
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
      <div className='panel panel-default'>
        <div className="panel-heading">
           {deleteButton} {editButton} <br /> 
           Question: {this.props.question._id} <br />
           <TagsInput value = {this.props.question.tags} onChange={this.handleTagsChange.bind(this)} />
           <HtmlView html={question.text} />
        </div>
        <div className="panel-body">
          <HtmlView html= {question.solution } />
        </div>
      </div>
    );

   }
  }
};






