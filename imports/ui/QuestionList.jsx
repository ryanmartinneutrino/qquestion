import React, { Component, PropTypes } from 'react';

import HtmlView from './HtmlView.jsx';
import QuestionPreview from './QuestionPreview.jsx';

 
// App component - represents the whole app
export default class QuestionList extends Component {

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
        <div>
          { this.renderQuestionList() }
        </div>
    );

   }
  }
};

QuestionList.propTypes = {
  questionList: React.PropTypes.array,
  loading: React.PropTypes.bool,
};



