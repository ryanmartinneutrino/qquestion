import React, { Component, PropTypes } from 'react';

import TagsInput from 'react-tagsinput'
 
// App component - represents the whole app
export default class SearchBox extends Component {

  constructor(props) {
    super(props)
    this.state = {tags: [], andTags:false}
  }

  handleAndTag(evt){
    this.state.andTags = evt.target.checked;//don't trigger render
    this.props.updateQuestionList(this.state.tags, this.state.andTags); //triggers render
  }

  handleTagsChange(tags){
    this.state.tags=tags;//don't trigger render
    this.props.updateQuestionList(this.state.tags, this.state.andTags); //triggers render
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




