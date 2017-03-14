
import React, {Component} from "react";


export default class CKEditor extends Component {
  constructor(props) {
    super(props);
    this.elementName = "editor_" + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
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
    CKEDITOR.inline(this.elementName, configuration);
    //CKEDITOR.replace(this.elementName, configuration);
    CKEDITOR.instances[this.elementName].on("change", function () {
      let data = CKEDITOR.instances[this.elementName].getData();
     // this.props.onChange(data);
    }.bind(this));
  }
}

