import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { Questions } from '../imports/api/questions.js';

import QuestionList from '../imports/ui/QuestionList.jsx';
import QuestionView from '../imports/ui/QuestionView.jsx';
import NewQuestionForm from '../imports/ui/NewQuestionForm.jsx';
import QuestionEditContainer from '../imports/ui/QuestionEdit.jsx';
import AppContainer from '../imports/ui/App.jsx'


FlowRouter.route('/', {
  name: 'AppContainer',
  action() {
    mount(AppContainer, {
      main: <QuestionView/>,
    });
  },
});

FlowRouter.route('/library', {
  name: 'library',
  action() {
    mount(AppContainer, {
      main: <QuestionList/>,
    });
  },
});


var editorSection = FlowRouter.group({
    prefix: "/editor"
});


editorSection.route('/', {
  name: 'editor',
  action: function(params) {
      mount(AppContainer, {
        main: <QuestionEditContainer/>,
      });
  },
});

editorSection.route('/:_id', {
  name: 'editor/_id',
  action: function(params) {
      mount(AppContainer, {
        main: <QuestionEditContainer  />,
      });
  },
});




