import React, { Component } from 'react';
import HtmlView from './HtmlView.jsx'; 
 
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

  render() {
   question = this.props.question;// ? this.props.questions : {text:'no question in db'} ;
   if(!question){
    return( <div className='container'>Loading...</div>);
   }
   else{
    return (
      <div className='panel panel-default'>
        <div className="panel-heading"> 
           Question: {this.props.question._id} <br />
           <span className="glyphicon glyphicon-remove" onClick={this.handleDelete.bind(this)} ></span> 
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






