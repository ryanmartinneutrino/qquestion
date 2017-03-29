
import React, {Component} from "react";


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

/*    CKEDITOR.instances[this.elementName].on( 'fileUploadRequest', function( evt ) {
      var xhr = evt.data.fileLoader.xhr;

      xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
      xhr.setRequestHeader( 'X-File-Name', this.fileName );
      xhr.setRequestHeader( 'X-File-Size', this.total );
      xhr.send( this.file );

      // Prevented the default behavior.
      evt.stop();
     } );*/

    //Need to figure this out!!!
    CKEDITOR.instances[this.elementName].on( 'fileUploadResponse', function( evt ) {
      // Prevent the default response handler.
      evt.stop();

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

