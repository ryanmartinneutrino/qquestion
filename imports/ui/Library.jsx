import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

import HtmlView from './HtmlView.jsx';
import QuestionList from './QuestionList.jsx';
import TagsInput from 'react-tagsinput'
 
// App component - represents the whole app
export class Library extends Component {

  constructor() {
    super()
    this.state = {tags: ["default","hello"]}
  }

  componentWillMount(){
    this.setState( { questionList: this.props.questionList, loading:this.props.loading});
  }

 //TODO: render should be using state, and handle Tags change should update the questionList in state, but this is not working
// presumably because the subscription isn't ready...

  handleTagsChange(tags){
    console.log(tags)
    const qhandle = Meteor.subscribe('questions');
    const loading = !qhandle.ready();
    questionList = Questions.find({ tags:{$in:tags}  }, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
    this.setState( { tags:tags, questionList:questionList, loading:loading} );  
  }


  render() {
   questionList = this.props.questionList;
   if(this.props.loading || !questionList){
    return(  <HtmlView html="Loading..." />);
   }
   else{
    return (
      <div className='panel panel-primary'>
        <div className="panel-heading">Questions</div>
        <TagsInput onChange={this.handleTagsChange.bind(this)} value={this.state.tags} />
        <QuestionList questionList= {this.props.questionList} loading={this.props.loading} />
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
//  const loading = questionList ? false:true;
  return {
    questionList: questionList,
    loading: loading,
  };
}, Library);



