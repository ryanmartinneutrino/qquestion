
import React, {Component} from "react";
import {Images} from '../api/questions.js';

export default class CKEditor extends Component {
  constructor(props) {
    super(props);
    this.elementName = "editor_" + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fileURLs=[];
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

    CKEDITOR.instances[this.elementName].on("afterInsertHtml", function () {
      //Need this to detect the html chaning from a file upload.
      let data = CKEDITOR.instances[this.elementName].getData();
      this.props.onChange(data);
    }.bind(this));

    CKEDITOR.instances[this.elementName].on( 'fileUploadRequest', function( evt ) {
      let upload = evt.data.requestData.upload;
      let filename = upload.name;
      let file = upload.file;
      var reader = new FileReader();
      console.log(evt);
      reader.addEventListener("loadend", function() {
        // gets triggered when file is read
        //TODO: This never gets called for a large jpeg???
        const fileURL=reader.result;
        this.fileURLs.push(fileURL);
        console.log("Sending");
        //console.log(fileURL);

        Meteor.call('images.insert', fileURL, filename);
        evt.data.requestData.filename =filename;
        evt.stop();
      }.bind(this));
      reader.readAsDataURL(file);
    
      // Prevented the default behavior.
     // evt.stop();
     }.bind(this));


    //Need to figure this out!!!
    CKEDITOR.instances[this.elementName].on( 'fileUploadResponse', function( evt ) {
      // Prevent the default response handler.
      evt.stop();
      console.log("In resp");
      console.log(evt.data);
      if (this.fileURLs[this.fileURLs.length - 1]){
        evt.data.url = this.fileURLs[this.fileURLs.length - 1];
      } else{
        console.log("canceled inresponse");
        evt.cancel();
      } 
     }.bind(this));

  }
}

