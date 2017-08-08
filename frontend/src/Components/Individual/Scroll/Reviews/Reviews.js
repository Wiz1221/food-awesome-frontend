import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateVote} from '../../../../Actions/Review'
import './Reviews.css'
import noImage from '../../../../Assets/no_image_added.png'

export class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: this.props.review.votes===null ? 0 : this.props.review.votes
    }
  }

  upVote = (e) => {
    let isLoggedIn = false
    if(!this.props.user.hasOwnProperty('_id')){
      return (alert('please log in'))
    } else {
      isLoggedIn=true
      let vote  = this.props.review.votes;
      if(vote === null) {
        vote = 1;
      } else {
        vote += 1;
      }

      //console.log('up', this.props.review._id)
      this.props.updateVote(this.props.review._id, vote)
      this.setState({
        votes: vote
      })

    }


  }

  downVote = (e) => {
    let isLoggedIn = false
    if(!this.props.user.hasOwnProperty('_id')){
      return (alert('please log in'))
    } else {
      isLoggedIn=true
      let vote  = this.props.review.votes;
      if(vote === null) {
        vote = 0;
      } else if(vote === 0){
        return vote
      } else {
        vote--
      }

      //console.log('up', this.props.review._id)
      this.props.updateVote(this.props.review._id, parseInt(vote))
      this.setState({
        votes: vote
      })

    }
  }
  showArrow = () => {
      return (<div>
        <button type="button" className="btn btn-default" onClick={this.upVote}>
          <span className="glyphicon glyphicon-menu-up"></span>
        </button>
        <div className="vote-number">{
          this.state.votes

        }</div>
        <button type="button" className="btn btn-default" onClick={this.downVote}>
          <span className="glyphicon glyphicon-menu-down"></span>
        </button>
      </div>)

  }
  componentDidMount(){
    // console.log('componentDidMount')
    let stars = document.getElementById(this.props.review._id).childNodes;

    let rating = this.props.review.star;
    stars.forEach( (e) => {
      let yellow = e.getAttribute('data-rating');
      if (yellow <= parseInt(rating)) {
        e.classList.remove('fa-star-o')
        e.classList.add('fa-star')
      }
    })
  }
  render() {
    return (
      <div className="row review">
        <div className="col-xs-1">
          {this.showArrow()}
        </div>
        <div className="col-xs-3 reviewImage">
          <img src={
            this.props.review.picReview==="" ? noImage : this.props.review.picReview
          } alt="picReview"/>
        </div>
        <div className="col-xs-5">
          <h4>{this.props.review.title}</h4>
          {this.props.review.description}
        </div>
        <div className="col-xs-3">
          <div className="star-rating" id={this.props.review._id}>
            <span className="fa fa-star-o star" data-rating="1"></span>
            <span className="fa fa-star-o star" data-rating="2"></span>
            <span className="fa fa-star-o star" data-rating="3"></span>
            <span className="fa fa-star-o star" data-rating="4"></span>
            <span className="fa fa-star-o star" data-rating="5"></span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateVote: (review_id, vote) => {dispatch(updateVote(review_id, vote))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
