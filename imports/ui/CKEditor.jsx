
import React, {Component} from "react";
import {Images, ImagesFS, ImagesMF} from '../api/questions.js';

export default class CKEditor extends Component {
  constructor(props) {
    super(props);
    this.elementName = "editor_" + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fileURLs=[];
    this.lastFileURL="http://www.freeiconspng.com/uploads/load-icon-png-22.png";
    var data = this.props.data ? this.props.data : "" ;
    this.state = { data: data};
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
    this.editor=CKEDITOR.instances[this.elementName]
    this.editor.setData(this.state.data);
    this.editor.on("change", function () {
      let data = CKEDITOR.instances[this.elementName].getData();
      this.props.onChange(data);
    }.bind(this));

    this.editor.on("afterInsertHtml", function () {
      //Need this to detect the html chaning from a file upload.
      let data = CKEDITOR.instances[this.elementName].getData();
      this.props.onChange(data);
      console.log("afterInsertHtml event");
    }.bind(this));

    this.editor.on( 'fileUploadRequest', function( evt ) {
      let upload = evt.data.requestData.upload;
      let filename = upload.name;
      let file = upload.file;
      var reader = new FileReader();

      console.log("In upload request");
      reader.addEventListener("loadend", function() {
        // gets triggered when file is read
        //TODO: This never gets called for a large jpeg???
        const fileURL=reader.result;
        this.fileURLs.push(fileURL);
        console.log("Starting insert");
        
        ImagesFS.insert(fileURL,function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
          console.log("FS collection inserted with id "+fileObj._id);
          this.lastFileURL=fileObj.url({brokenIsFine:true});
          console.log("url for FS after insert is "+this.lastFileURL);
        }.bind(this)) ;

        //evt.cancel();
      }.bind(this));
      reader.readAsDataURL(file);
      // Prevented the default behavior.
     // evt.stop();
     }.bind(this));

    //TODO: Need a timeout before the response to give time for the file to upload!

    this.editor.on( 'fileUploadResponse', function( evt ) {
      // Prevent the default response handler.
      evt.stop();
      console.log("In resp");
      console.log("URL from FS: "+this.lastFileURL);
    //  console.log("Last file in meteor files: "+ImagesMF.findOne().link());
      console.log(evt);


      if (this.fileURLs[this.fileURLs.length - 1]){
        //evt.data.url = this.fileURLs[this.fileURLs.length - 1];
        evt.data.url = this.lastFileURL;
        //evt.data.url = ImagesMF.findOne().link();
      } else{
        console.log("canceled inresponse");
        evt.cancel();
      }
 
     }.bind(this));

  }
}

