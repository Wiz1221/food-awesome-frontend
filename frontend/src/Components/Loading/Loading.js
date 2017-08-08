import React, {Component} from 'react';

import './Loading.css';

export class Loading extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <i className="fa fa-spin fa-3x fa-circle-o-notch" aria-hidden="true" id="loadingSpinner" />
        </div>
      </div>
    );
  }
}

export default Loading;
