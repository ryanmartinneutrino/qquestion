import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

import HtmlView from './HtmlView.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import TagsInput from 'react-tagsinput'
 

//TODO: Library and QuestionSearch need to deal with the question list when they first mount!!!
//then, Library doesn't need to be a container anymore, but QuestionSearch probably does...

export class Library extends Component {

  constructor(props) {
    super(props)
    //this.state = {tags: [], andTags:false}
  }

  componentWillMount(){
    this.setState( { questionList: this.props.questionList, loading:this.props.loading});
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { questionList: nextProps.questionList, loading:nextProps.loading});
  }
  refreshQuestionList(questionList){
    this.setState({questionList:questionList});
  }

  render() {
   questionList = this.state.questionList;
   if(this.state.loading || !questionList){
    return(  <HtmlView html="Loading..." />);
   }
   else{
    return (
      <div className='panel panel-primary'>
       <QuestionSearch  onChange = {this.refreshQuestionList.bind(this)}/> 
       <div className="panel-heading">{this.state.questionList.length}  Questions</div>
       <QuestionList questionList= {this.state.questionList} loading={this.state.loading} />
      </div>
    );

   }
  }
};

Library.propTypes = {
  questionList: React.PropTypes.array,
  loading: React.PropTypes.bool,
};

export default  LibraryContainer =  createContainer( () => {
  const qhandle = Meteor.subscribe('questions');
  const loading = !qhandle.ready();   
  questionList = Questions.find({}, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
  return {
    questionList: questionList,
    loading: loading,
  };
}, Library);



