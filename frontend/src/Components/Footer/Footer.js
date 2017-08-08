import React, {Component} from 'react';
import './Footer.css'
export class Footer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="row footer">
        <div className="col-sm-4 about">
          Food Awesome &copy; 2017
        </div>
        <div className="col-sm-2 col-sm-offset-5 share">
          <span id="github">Visit our repo at: </span>
          <a href="https://github.com/dheamariesta/food-awesome"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>{/*<img src=facebooklogo id="facebook-logo"/>*/}
        </div>
      </div>

    );
  }
}

export default Footer;
