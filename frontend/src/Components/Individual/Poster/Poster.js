import React, {Component} from 'react';
import './Poster.css'

export class Poster extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="col-sm-5 item">
        <div className="col-sm-12">
          <img src={this.props.img} className="restaurant-image" alt="rest"/>
        </div>
      </div>
    );
  }
}

export default Poster;
