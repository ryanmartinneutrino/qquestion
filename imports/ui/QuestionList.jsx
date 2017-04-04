import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

import HtmlView from './HtmlView.jsx';
import QuestionPreview from './QuestionPreview.jsx';

 
// App component - represents the whole app
export class QuestionList extends Component {

 componentDidMount () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }


 componentDidUpdate () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }


 renderQuestionList() {
   questionList = this.props.questionList;
   return questionList.map( (question) => (
     <QuestionPreview key={question._id} question={question} />
   ));
 } 

 render() {
   questionList = this.props.questionList;
   if(this.props.loading || !questionList){
    return(  <HtmlView html="Loading..." />);
   }
   else{
    return (
      <div className='panel panel-primary'>
        <div className="panel-heading">Questions</div>
        <div className="panel-body">
          { this.renderQuestionList() }
        </div>
      </div>
    );

   }
  }
};

QuestionList.propTypes = {
  questionList: React.PropTypes.array,
  loading: React.PropTypes.bool,
};

export default  QuestionListContainer =  createContainer( () => {
//  const qhandle = Meteor.subscribe('questions');
//  const loading = !qhandle.ready();   
  questionList = Questions.find({}, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
  const loading = questionList ? false:true;
  return {
    questionList: questionList,
    loading: loading,
  };
}, QuestionList);



