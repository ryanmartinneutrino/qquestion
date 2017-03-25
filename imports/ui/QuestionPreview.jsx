import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

 
// App component - represents the whole app
export default class QuestionPreview extends Component {

 question_html() {
  return {__html: this.props.question.text} 
 }

 componentDidUpdate () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

 render() {
   question = this.props.question;// ? this.props.questions : {text:'no question in db'} ;
   if(!question){
    return( <div className='container'>Loading...</div>);
   }
   else{
    return (
      <div className='container'>
      <div dangerouslySetInnerHTML={this.question_html()} />  
      </div>
    );

   }
  }
};






