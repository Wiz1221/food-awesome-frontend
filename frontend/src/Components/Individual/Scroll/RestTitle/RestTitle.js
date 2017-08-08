import React, {Component} from 'react';

import './RestTitle.css'

export class RestTitle extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <div className="title">{this.props.name}</div>
      </div>
    );
  }
}

export default RestTitle;
