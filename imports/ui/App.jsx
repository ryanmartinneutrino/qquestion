import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import QuestionViewContainer from './QuestionView.jsx';
import NewQuestionForm from './NewQuestionForm.jsx';
import Navbar from './Navbar.jsx';

 
// App component - represents the whole app
export class App extends Component {
 render() {
    return (
      <div className="container">
        <header>
        </header>
        <Navbar />
      {this.props.main}
      </div>
    );
  }
}

export default AppContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    user: Meteor.user(),
  };
}, App);

