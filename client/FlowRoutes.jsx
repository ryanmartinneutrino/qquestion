import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import QuestionList from '../imports/ui/QuestionList.jsx';
import QuestionView from '../imports/ui/QuestionView.jsx';
import NewQuestionForm from '../imports/ui/NewQuestionForm.jsx';
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
  name: 'AppContainer',
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
  name: 'AppContainer',
  action: function(params) {
      mount(AppContainer, {
        main: <NewQuestionForm/>,
      });
  },
});

editorSection.route('/:id', {
  name: 'AppContainer',
  action: function(params) {
      mount(AppContainer, {
        main: <NewQuestionForm question_id={params.id}/>,
      });
  },
});




