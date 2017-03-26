import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

import HtmlView from './HtmlView.jsx';

 
// App component - represents the whole app
export class QuestionView extends Component {

 componentDidUpdate () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

 render() {
   question = this.props.question;// ? this.props.questions : {text:'no question in db'} ;
   if(this.props.loading || !question){
    return(  <HtmlView html="Loading..." />);
   }
   else{
    return (
      <div className='panel panel-primary'>
        <div className="panel-heading">Question</div>
        <div className="panel-body">
          <HtmlView html= {question.text } />
        </div>
      </div>
    );

   }
  }
};

QuestionView.propTypes = {
  question: React.PropTypes.object,
  loading: React.PropTypes.bool,
};

export default  QuestionViewContainer =  createContainer(() => {
  const qhandle = Meteor.subscribe('questions');
  const loading = !qhandle.ready();   
  question = Questions.findOne({}, {sort: {createdAt: -1, limit: 1}});
  return {
    question: question,
    loading: loading,
  };
}, QuestionView);




