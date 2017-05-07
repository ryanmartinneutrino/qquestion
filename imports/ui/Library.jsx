import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

import HtmlView from './HtmlView.jsx';
import QuestionList from './QuestionList.jsx';
import SearchBox from './SearchBox.jsx';
import TagsInput from 'react-tagsinput'
 
// App component - represents the whole app
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

  updateQuestionList(tags=[],andTags=false){

    if (tags.length){
      if (andTags === false){
        questionList = Questions.find({ tags:{$in:tags}  }, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
      }else{
        var arr = []
        console.log("the tags are ",tags)
        for (var i=0; i < tags.length; i++){
          arr.push({tags:tags[i]})
        }
        questionList = Questions.find({$and:arr}, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
      }
    }else{
      questionList = Questions.find({ }, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
    }
    this.setState({questionList:questionList})
  }

  render() {
   questionList = this.state.questionList;
   if(this.state.loading || !questionList){
    return(  <HtmlView html="Loading..." />);
   }
   else{
    return (
      <div className='panel panel-primary'>
       <SearchBox updateQuestionList = {this.updateQuestionList.bind(this)} /> 
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



