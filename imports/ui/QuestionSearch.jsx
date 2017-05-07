import React, { Component, PropTypes } from 'react';

import { Meteor } from 'meteor/meteor';

import { Questions } from '../api/questions.js';

import TagsInput from 'react-tagsinput'
 
// App component - represents the whole app
export default class QuestionSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {tags: [], andTags:false}
  }

  getQuestionList(){
    tags = this.state.tags
    andTags = this.state.andTags
 
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
    return questionList;
  }

  handleAndTag(evt){
    this.state.andTags = evt.target.checked;//don't trigger render
    this.props.onChange( this.getQuestionList() );
  }

  handleTagsChange(tags){
    this.state.tags=tags;//don't trigger render
    this.props.onChange( this.getQuestionList() );
  }


  render() {
    return (
      <div className='panel panel-success' >
        <div className='panel-heading'> Search </div>
        <div className='panel-body'> 
          <input type="checkbox" name="andTags" onChange={this.handleAndTag.bind(this)} checked={this.state.andTags} /> AND the tags: <br/> 
          <TagsInput onChange={this.handleTagsChange.bind(this)} value={this.state.tags} />
        </div>
      </div>
    );

   }
};




