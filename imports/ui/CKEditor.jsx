
import React, {Component} from "react";
import {Images} from '../api/questions.js';

export default class CKEditor extends Component {
  constructor(props) {
    super(props);
    this.elementName = "editor_" + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
    //this.props = {inline : false, id:'1'}
  }

  render() {
    return (
     <div className="bordertextarea">
      <textarea rows="5" name={this.elementName} defaultValue={this.props.value} ></textarea>
     </div>
    )
  }

  componentDidMount() {
    let configuration = {
      customConfig: '/ckeditor_config.js'
    };
    CKEDITOR.disableAutoInline = true;
    if(this.props.inline){
      CKEDITOR.inline(this.elementName, configuration);
    }else{
      CKEDITOR.replace(this.elementName, configuration);
    }
    CKEDITOR.instances[this.elementName].on("change", function () {
      let data = CKEDITOR.instances[this.elementName].getData();
      this.props.onChange(data);
    }.bind(this));

    CKEDITOR.instances[this.elementName].on( 'fileUploadRequest', function( evt ) {
      let upload = evt.data.requestData.upload;
      let filename = upload.name
      let file = upload.file 
      console.log(file);
      Meteor.subscribe('images');

      const response = Meteor.call('images.insert', file);
      console.log(response);
      // Prevented the default behavior.
      evt.stop();
     } );

    //Need to figure this out!!!
    CKEDITOR.instances[this.elementName].on( 'fileUploadResponse', function( evt ) {
      // Prevent the default response handler.
      evt.stop();

      console.log("here resp");
      // Get XHR and response.
      var data = evt.data,
        xhr = data.fileLoader.xhr,
        response = xhr.responseText.split( '|' );
      if ( response[ 1 ] ) {
        // An error occurred during upload.
        data.message = response[ 1 ];
        evt.cancel();
      } else {
        data.url = response[ 0 ];
       }
     } );

  }
}

