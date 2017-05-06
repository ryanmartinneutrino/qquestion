import React, { Component, PropTypes } from 'react';
 
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
 
import { Questions } from '../api/questions.js';

import HtmlView from './HtmlView.jsx';
import QuestionList from './QuestionList.jsx';
import TagsInput from 'react-tagsinput'
 
// App component - represents the whole app
export class Library extends Component {

  constructor(props) {
    super(props)
    this.state = {tags: []}
  }

  componentWillMount(){
    this.setState( { questionList: this.props.questionList, loading:this.props.loading});
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { questionList: nextProps.questionList, loading:nextProps.loading});
  }

 componentDidMount () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

 componentDidUpdate () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }



  handleTagsChange(tags){
  //TODO: should make sure that loading is handled correct! Here it is not set, assumed that the original container has set it.
    console.log(tags)
    //const qhandle = Meteor.subscribe('questions');
    //const loading = !qhandle.ready();
    if (tags.length){
      questionList = Questions.find({ tags:{$in:tags}  }, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
    }else{
      questionList = Questions.find({ }, {sort: {createdAt: -1}, skip:0, limit:10}).fetch();
    }

//    console.log(questionList)
    this.setState( { tags:tags, questionList:questionList} );  
  }


  render() {
   questionList = this.state.questionList;
   if(this.state.loading || !questionList){
    return(  <HtmlView html="Loading..." />);
   }
   else{
    return (
      <div className='panel panel-primary'>
        <div className="panel-heading">{this.state.questionList.length}  Questions</div>
        
        <TagsInput onChange={this.handleTagsChange.bind(this)} value={this.state.tags} />
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
//  const loading = questionList ? false:true;
  return {
    questionList: questionList,
    loading: loading,
  };
}, Library);



