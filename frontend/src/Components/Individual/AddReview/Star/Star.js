import React, {Component} from 'react';

import './Star.css';

class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starClicked: false,
      starValue: 0,
    }
  }

  starEnter = (event) => {
    if(!this.state.starClicked){
      let stars = document.getElementById('starImages').childNodes;
      for (var i = 0; i < event.target.dataset.rating ; i++) {
        stars[i].classList.remove('fa-star-o');
        stars[i].classList.add('fa-star');
      }
    }
  }

  starLeave = (event) => {
    if(!this.state.starClicked){
      let stars = document.getElementById('starImages').childNodes;
      stars.forEach((star,index) => {
        star.classList.remove('fa-star');
        star.classList.add('fa-star-o');
      })
    }
  }

  starClicked = (event) => {
    this.setState({
      starValue: event.target.dataset.rating,
      starClicked: true
    })
    this.props.passStarValue( event.target.dataset.rating)
  }

  clearStar = () => {
    let stars = document.getElementById('starImages').childNodes;
    stars.forEach((star,index) => {
      star.classList.remove('fa-star');
      star.classList.add('fa-star-o');
    })
    this.setState({
      starValue: 0,
      starClicked: false
    })
    this.props.passStarValue(0)
  }

  render() {
    return (
      <div className="form-group">
        <label>Rate this restaurant</label>
        <span className="star-rating" id='starImages'>
          <span className="fa fa-star-o star"
                data-rating="1"
                onMouseEnter={this.starEnter}
                onMouseLeave={this.starLeave}
                onClick = {this.starClicked}></span>
          <span className="fa fa-star-o star"
                data-rating="2"
                onMouseEnter={this.starEnter}
                onMouseLeave={this.starLeave}
                onClick = {this.starClicked}></span>
          <span className="fa fa-star-o star"
                data-rating="3"
                onMouseEnter={this.starEnter}
                onMouseLeave={this.starLeave}
                onClick = {this.starClicked}></span>
          <span className="fa fa-star-o star"
                data-rating="4"
                onMouseEnter={this.starEnter}
                onMouseLeave={this.starLeave}
                onClick = {this.starClicked}></span>
          <span className="fa fa-star-o star"
                data-rating="5"
                onMouseEnter={this.starEnter}
                onMouseLeave={this.starLeave}
                onClick = {this.starClicked}></span>

          <input type="hidden" name="whatever1" className="rating-value" value="2.56"/>
        </span>
        <button id="starClearButton" type="submit" className="btn btn-danger" onClick={this.clearStar}>Clear</button>
      </div>
    );
  }
}

export default Star
