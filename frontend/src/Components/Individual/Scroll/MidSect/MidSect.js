import React, {Component} from 'react';

import './MidSect.css'

export class MidSect extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="description">
        {this.props.description}
      </div>
    );
  }
}

export default MidSect;
