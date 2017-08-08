import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';

class RestaurantDetail extends Component {
  componentDidMount(){
    // console.log('componentDidMount')
    let stars = document.getElementById(this.props.restaurantDetail._id).childNodes;

    let rating = this.props.restaurantDetail.star;
    stars.forEach( (e) => {
      let yellow = e.getAttribute('data-rating');
      if (yellow <= parseInt(rating)) {
        e.classList.remove('fa-star-o')
        e.classList.add('fa-star')
      }
    })
  }

  onClick = () => {
    this.props.onClick();
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-3 reviewImage">
          <img src={this.props.restaurantDetail.picHome} alt="restaurantPicture"/>
          <div className="star-rating" id={this.props.restaurantDetail._id}>
            <span className="fa fa-star-o star" data-rating="1"></span>
            <span className="fa fa-star-o star" data-rating="2"></span>
            <span className="fa fa-star-o star" data-rating="3"></span>
            <span className="fa fa-star-o star" data-rating="4"></span>
            <span className="fa fa-star-o star" data-rating="5"></span>
          </div>
          <Link to={'/individual/' + this.props.restaurantDetail.name}>
            <button type="submit" className="blue-button-primary" onClick={this.onClick}>Go to restaurant page</button>
          </Link>
        </div>
        <div className="col-xs-9">
          <h4>{this.props.restaurantDetail.name}</h4>
          {this.props.restaurantDetail.describeIndividual}
        </div>
      </div>
    );
  }
}

export default RestaurantDetail
