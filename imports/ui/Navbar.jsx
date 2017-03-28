import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
// App component - represents the whole app
export default class Navbar extends Component {

 render() {
    return (
      <div className='navbar navbar-inverse'>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span> 
            </button>
            <a className="navbar-brand" href="/">QDB</a>
          </div>
         <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li><a href="/library">Library</a></li>
              <li><a href="/editor">Editor</a></li>
              <li><a href="/test-maker">Test Maker</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>  <AccountsUIWrapper /> </li>
              <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
              <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
          </div>
        </div>
      </div>
    );

  }
};






