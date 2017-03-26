import React, { Component } from 'react';
import HtmlView from './HtmlView.jsx'; 
 
// App component - represents the whole app
export default class QuestionPreview extends Component {

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
      <HtmlView html= {question.text } />
      </div>
    );

   }
  }
};






