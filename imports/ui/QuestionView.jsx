import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

 
// App component - represents the whole app
class QuestionView extends Component {

 render() {
   question = this.props.question;// ? this.props.questions : {text:'no question in db'} ;
    return (
      <div className='container'>
      Question Text:
      <h2>
      { this.props.loading ? "loading": question.text } 
      </h2>
      </div>
    );
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
  console.log(loading? "still loading": "loaded question "+question._id+" with text "+question.text);
  return {
    question: question,
    loading: loading,
  };
}, QuestionView);




