import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import QuestionViewContainer from './QuestionView.jsx';
import NewQuestionForm from './NewQuestionForm.jsx';



 
// App component - represents the whole app
export default class App extends Component {
 render() {
    return (
      <div className="container">
        <header>
          <h1>QQuestion </h1>
        </header>
      <NewQuestionForm />
      <br />
      <QuestionViewContainer />
      </div>
    );
  }
}
