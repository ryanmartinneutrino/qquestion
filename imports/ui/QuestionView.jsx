import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

 
// App component - represents the whole app
class QuestionView extends Component {

 question_html() {
  return {__html: this.props.question.text} 
 }

 render() {
   question = this.props.question;// ? this.props.questions : {text:'no question in db'} ;
   if(this.props.loading || !question){
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
}

QuestionView.propTypes = {
  question: React.PropTypes.object,
  loading: React.PropTypes.bool,
};

export default QuestionViewContainer =  createContainer(() => {
  const qhandle = Meteor.subscribe('questions');
  const loading = !qhandle.ready();   
  question = Questions.findOne({}, {sort: {createdAt: -1, limit: 1}});
  return {
    question: question,
    loading: loading,
  };
}, QuestionView);




