import React, {Component} from 'react';
import { connect } from 'react-redux';
import { activeReviewDetails } from '../../../../Actions/Review';


class ReviewListView extends Component {

  onClick = () =>{
    this.props.activeReviewDetails(this.props.review._id);
  }

  render() {
    return (

      <div className="col-md-12 reviewmini list-group-item" onClick={this.onClick}>
        <div className="review-list-view-title">{this.props.review.title}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeReviewDetails: (review_id) => {dispatch(activeReviewDetails(review_id));}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReviewListView);
