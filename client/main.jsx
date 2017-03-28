import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';
import { renderRoutes } from '../imports/ui/Routes.jsx';

import { Router, Route, browserHistory } from 'react-router';
 
Meteor.startup(() => {
//  render(<App />, document.getElementById('render-target'));
  render(renderRoutes(), document.getElementById('render-target'));
//  render( 
//    <Router history={ browserHistory }>
//      <Route path="/" component={ App } />
//    </Router>, 
//    document.getElementById( 'render-target' ) 
//  );

});
