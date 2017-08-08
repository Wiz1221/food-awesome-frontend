import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateReviewWithPic, updateReviewWithoutPic, deleteReview } from '../../../../Actions/Review';
import Star from '../../../Individual/AddReview/Star/Star';
import RestaurantDetail from '../RestaurantDetail/RestaurantDetail';
import {activeHome, getReviewOfActive} from '../../../../Actions/Home/activeHome';

import './EditReview.css';
import '../../../Individual/AddReview/Star/Star.css';

class EditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {},
      picReview: null,
      restaurantDetail:null
    }
  }

  // Review Model
//   title: String,
// star: Number,
// votes: Number,
// description: String,
// pic: String,
// picPublicId:String,
// id: String,
// user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },

  componentWillReceiveProps(nextProps){
    let activeReviewObject = {};
    nextProps.user.reviews.forEach((review,index,arr) => {
      if(review._id===nextProps.activeUserReview){
         activeReviewObject = review
      }
    })
    let restaurantDetail = nextProps.restaurants.filter((restaurant,index) => {
      return restaurant._id === activeReviewObject.restaurant
    })
    console.log("line4",restaurantDetail)
    this.setState({
      review: activeReviewObject,
      restaurantDetail: restaurantDetail[0]
    })

  }


  passStarValue = (noOfStar) => {
    let review = this.state.review;
    review.star = noOfStar;
    this.setState({
      review: review
    })
  }

  onChange = (event) => {
    let review = this.state.review;
    if(event.target.id==="picReview"){
      this.setState({
        picReview: event.target.files[0]
      })
    }else{
      review[event.target.id] = event.target.value;
    }
    this.setState({
      review: review
    })
  }

  updateReview = () => {

    if(this.state.picReview ===null){
      console.log("without pic")
      this.props.updateReviewWithoutPic(this.state.review);

    }else{

      console.log("with pic")
      this.props.updateReviewWithPic(this.state.picReview, this.state.review);
    }
    alert('update successful')
  }

  deleteReview = () => {
    this.props.deleteReview(this.state.review._id, this.state.review.restaurant);
  }

  onClick = () => {
    this.props.activeHome(this.state.restaurantDetail)
    this.props.getReviewOfActive(this.state.restaurantDetail._id)
  }

  render() {
    return (
      <div>
      {
        "_id" in this.state.review ? (
          <div>
          <RestaurantDetail restaurantDetail={this.state.restaurantDetail} onClick={this.onClick}/>
          <h4>Your review</h4>
          <div className="form-group">
            <label>Title</label>
            <input id = "title"
                   type="text"
                   className="form-control"
                   aria-describedby="emailHelp"
                   placeholder="Title"
                   onChange={this.onChange}
                   value={this.state.review.title? this.state.review.title: ""}/>
          </div>
          <Star passStarValue={this.passStarValue}/>
          <div className="form-group">
            <label>Say something?</label>
            <textarea id="description"
                      className="form-control"
                      name="forIndividual"
                      rows={3}
                      placeholder="description"
                      onChange={this.onChange}
                      value={this.state.review.description? this.state.review.description: ""}/>
          </div>
          <div className="form-group">
            <label>Picture input</label>
            <input id="picReview"
                   type="file"
                   className="form-control-file"
                   aria-describedby="fileHelp"
                   onChange={this.onChange}
                   />
          </div>
          <button type="submit" className="blue-button-primary" onClick={this.updateReview}>Update</button>
          <button type="submit" className="red-button-danger" onClick={this.deleteReview}>Delete</button>
          </div>
        ): (<h1 id="defaultEditReviewLook"> Please select a review</h1>)
      }
       </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    user: state.user,
    activeUserReview: state.activeUserReview
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateReviewWithPic: (picReview, review) => {dispatch(updateReviewWithPic(picReview, review));},
    updateReviewWithoutPic: (review) => {dispatch(updateReviewWithoutPic(review));},
    deleteReview: (review_id, restaurant_id) => {dispatch(deleteReview(review_id, restaurant_id));},
    activeHome: (active) => {dispatch(activeHome(active));},
    getReviewOfActive: (id) => {dispatch(getReviewOfActive(id));}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditReview);
