import React, {Component} from 'react';
import { connect } from 'react-redux';
import {activeHome, getReviewOfActive} from '../../../Actions/Home/activeHome'
import RestaurantItem from '../RestaurantItem/RestaurantItem';

export class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: this.props.restaurants
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      restaurants: nextProps.restaurants
    })
  }

  onClick = (id, active) => {
    this.props.activeHome(active)
  }
  //console.log('restaurants', restaurants)
  renderRestaurants = () => {
    //console.log('render_func', restaurants)
    let restaurants = this.props.restaurants;
    if (restaurants.length === 0) {
      return  (<div>Loading restaurant list...</div>)
    } else {
      return restaurants.map((restaurant) => {
        return (

          <RestaurantItem name={restaurant.name}
                        id = {restaurant.id}
                        description={restaurant.describeHome}
                        picHome={restaurant.picHome}
                        star={restaurant.star}
                        onClick={this.onClick}
                        key={restaurant.id}
                        _id = {restaurant._id}
                        describeIndividual={restaurant.describeIndividual}
                        reviews={restaurant.reviews}/>

        )
      });
    }

  }


  render() {
    //const res = this.renderRestaurants(this.state.restaurants)

    return (

      <div className="container-fluid">
        <div className="row">
          {this.renderRestaurants()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    activeHome: state.activeHome
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    activeHome: (active) => {dispatch(activeHome(active));},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
