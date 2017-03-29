import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// route components
import NewQuestionForm from './NewQuestionForm.jsx';
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import QuestionListContainer from './QuestionList.jsx';



export const renderRoutes = () => (
  <Router >
    <div>
      <Navbar />
      <Route exact path="/" component={App}/>
      <Route path="/editor" component={NewQuestionForm}/>
      <Route path="/library" component={QuestionListContainer}/>
    </div>
  </Router>
);
