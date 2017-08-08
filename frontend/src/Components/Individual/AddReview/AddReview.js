import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addReviewWithPic, addReviewWithoutPic } from '../../../Actions/Review';
import Star from './Star/Star';
// import { calculateStar } from '../../../API/AdminAPI';

import './AddReview.css';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {},
      picReview: null,
      adminMessage:"",
      isLoggedIn: false,
      submitSuccessful: false
    }
  }

  // Review Model
//   title: String,
// star: Number,
// votes: Number,
// description: String,
// picReview: String,
// picReviewPublicId:String,
// id: String,
// user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },

  passStarValue = (noOfStar) => {
    let newReview = this.state.review;
    newReview.star = noOfStar;
    this.setState({
      review: newReview
    })
  }

  onChange = (event) => {
    let newReview = this.state.review;
    if(event.target.id==="picReview"){
      this.setState({
        picReview: event.target.files[0]
      })
    }else{
      newReview[event.target.id] = event.target.value;
    }
    this.setState({
      review: newReview
    })

  }

  addReview = () => {
    let newReview = this.state.review;
    let propArray = ['title', 'description', 'star'];
    let missing = false;
    let messageTemplate = "please enter ";
    propArray.forEach((prop,index) => {
      if(prop==="star"){
        if(!(prop in newReview)||newReview.star===0){
          messageTemplate+= ("and rating.");
          missing = true;
        }
      }else{
        if(!(prop in newReview)){
          messageTemplate+= (prop + ", ");
          missing = true;
        }
      }
    })
    this.setState({
      missing: missing,
      adminMessage: messageTemplate
    })


    // console.log(newReview.star)
    // let updateRestaurantStar = calculateStar(this.props.activeHome,"POST",newReview.star)
    // console.log(updateRestaurantStar)

    if(!missing){
      newReview.user_id = this.props.user._id;
      newReview.restaurant_id = this.props.activeHome._id;
      if(this.state.picReview===null){
        this.props.addReviewWithoutPic(newReview);
      }else{
        this.props.addReviewWithPic(this.state.picReview,newReview);
      }

      this.setState({
        submitSuccessful: true
      })
    }
  }

  closeReviewBox = () => {
    this.props.closeReviewBox();
  }

  render() {
    return (
      <div id="reviewContainer">
        <div className="adminMessage">{
          this.state.missing? (this.state.adminMessage) : (this.state.submitSuccessful? "Submited successfully" : null)
        }</div>
        <h4>Your Review</h4>
          <div className="form-group">
            <label>Title</label>
            <textarea id="title"
                      className="form-control"
                      rows={2}
                      placeholder="Enter reviews here"
                      onChange={this.onChange}
                      value={this.state.review.title? this.state.review.title: ""}/>
          </div>
          <Star passStarValue={this.passStarValue}/>
          <div className="form-group">
            <label>Say something?</label>
            <textarea id="description"
                      className="form-control"
                      rows={5}
                      placeholder="Enter reviews here"
                      onChange={this.onChange}
                      value={this.state.review.description? this.state.review.description: ""}/>
          </div>
          <div className="form-group">
            <label>Upload your favorite food</label>
            <input id="picReview"
                   type="file"
                   className="form-control-file"
                   aria-describedby="fileHelp"
                   onChange={this.onChange}
                   />
          </div>
          {
            this.state.submitSuccessful ? (
              <button type="submit" className="btn btn-primary" onClick={this.closeReviewBox}>Close</button>
            ):(
              <div>
              <button type="submit" className="btn btn-primary" onClick={this.addReview}>Submit</button>
              <button type="submit" className="btn btn-danger" onClick={this.closeReviewBox}>Discard</button>
              </div>
            )
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

const mapDispatchToProps = (dispatch) => {
  return {
    addReviewWithPic: (picReview, newReview) => {dispatch(addReviewWithPic(picReview, newReview));},
    addReviewWithoutPic: (newReview) => {dispatch(addReviewWithoutPic(newReview));},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddReview);
