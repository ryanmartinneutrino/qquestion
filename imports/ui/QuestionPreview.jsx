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
      <div className='panel panel-default'>
        <div className="panel-heading">Question Preview</div>
        <div className="panel-body">
          <HtmlView html= {question.text } />
        </div>
      </div>
    );

   }
  }
};






