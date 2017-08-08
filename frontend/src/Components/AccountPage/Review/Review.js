import React, {Component} from 'react';


import ReviewList from './ReviewList/ReviewList';
import EditReview from './EditReview/EditReview';

import './Review.css';

class Review extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3" id="ReviewList">
            <ReviewList/>
          </div>
          <div className="col-md-9" id="ReviewEdit">
            <EditReview />
          </div>
        </div>
      </div>
    );
  }
}

export default Review
