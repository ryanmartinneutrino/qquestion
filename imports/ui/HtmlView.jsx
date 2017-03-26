import React, { Component } from 'react';

 
// App component - represents the whole app
export default class HtmlView extends Component {

 html() {
  return {__html: this.props.html} 
 }

 componentDidUpdate () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

 render() {
    return (
      <div className='container'>
      <div dangerouslySetInnerHTML={this.html()} />  
      </div>
    );

  }
};






