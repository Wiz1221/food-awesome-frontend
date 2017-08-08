import React, {Component} from 'react';
import RestTitle from './RestTitle/RestTitle';
import MidSect from './MidSect/MidSect';
import Reviews from './Reviews/Reviews';
import AddReview from '../AddReview/AddReview';
import { connect } from 'react-redux';
import './Scroll.css'

export class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddReviewOpen: false,
      popUp: false,
    }
  }

  closeReviewBox = () => {
    this.setState({ isAddReviewOpen:false })
  }

  reviewBoxOpen = () => {
    let isLoggedIn = false
    if(this.props.user.hasOwnProperty('_id')){
      isLoggedIn = true
    }

    if(!isLoggedIn){
      this.setState({ popUp: true })
    }else{
      this.setState({ isAddReviewOpen: true })
    }
  }

  adminMessage = () => {
    return (<div>Please Login to post review</div>)
  }


  renderReviewItem = () => {
    let reviews = this.props.restaurant.reviews
    //console.log('renderReviewItem')
    reviews.sort( (a, b) => {
      return b.votes - a.votes;
    });
    return reviews.map((el) => {
        return (<Reviews key={el._id} review={el}/>)

    })
  }

  render() {
    return (
      <div className="col-sm-7">
        <div className="col-sm-12 scroll-item">
        <div className="restaurant-description">
          <RestTitle name={this.props.restaurant.name}/>
          <MidSect description={this.props.restaurant.describeIndividual}/>
          <div>{this.renderReviewItem()}</div>
        </div>
        </div>
        { this.state.popUp? this.adminMessage(): null }
        <button id="writeReviewButton" type="submit" className="blue-button-primary" onClick={this.reviewBoxOpen}>Write a Review</button>
        {
          this.state.isAddReviewOpen ? (
            <div>
            <AddReview closeReviewBox={this.closeReviewBox}/>
            </div>
          ) :null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeHome: state.activeHome
  }
}

export default connect(mapStateToProps)(Scroll);
