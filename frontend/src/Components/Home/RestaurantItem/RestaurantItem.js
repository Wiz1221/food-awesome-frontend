import React, {Component} from 'react';
import Loading from '../../Loading/Loading';
// import share from './share-icon-white.png'
import './RestaurantItem.css'
import {
  Link
} from 'react-router-dom';

class RestaurantItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    // console.log('componentDidMount')
    let stars = document.getElementById(this.props.id).childNodes;

    let rating = this.props.star;
    stars.forEach( (e) => {
      let yellow = e.getAttribute('data-rating');
      if (yellow <= parseInt(rating)) {
        e.classList.remove('fa-star-o')
        e.classList.add('fa-star')
      }
    })
  }
  onClick = (e) => {
    this.props.onClick(this.props._id, this.props)
  }

  //{"/individual/" + this.props.name}

  handleImageLoaded = () => {
    this.setState({ loading: false });
  }

  renderSpinner() {
    if (this.state.loading) {
      // Render nothing if not loading
      return (
        <Loading />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="col-sm-3 item" onClick = {this.onClick}>
        <div className="col-sm-12 restaurant-box">
          <Link to={'/individual/' + this.props.name}>
          {this.renderSpinner()}
            <div id="image">
              <img src={this.props.picHome} onLoad={this.handleImageLoaded} className="restaurant-image" alt="rest"/>
            </div>
          </Link>
          {/*<img src=share id="share-button" className="hover"/>*/}

          <h4 className="restaurant-item-title">{this.props.name}</h4>

          <div className="star-rating" id={this.props.id}>
            <span className="fa fa-star-o star" data-rating="1"></span>
            <span className="fa fa-star-o star" data-rating="2"></span>
            <span className="fa fa-star-o star" data-rating="3"></span>
            <span className="fa fa-star-o star" data-rating="4"></span>
            <span className="fa fa-star-o star" data-rating="5"></span>
          </div>
          <span className="restaurant-item-description">{this.props.description}</span>

        </div>
      </div>
    );
  }
}

export default RestaurantItem;
