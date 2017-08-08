import React, {Component} from 'react';
import { connect } from 'react-redux';
import { activeRestaurantDetails } from '../../../Actions/Admin/ActiveRestaurant';

class RestaurantListView extends Component {

  onClick = () =>{
    this.props.activeRestaurantDetails(this.props.restaurant.id);
  }

  render() {
    return (
      <div className="col-md-12 restaurantmini list-group-item" onClick={this.onClick}>
        <div className="name">{this.props.restaurant.name}</div>
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
    activeRestaurantDetails: (restaurantid) => {dispatch(activeRestaurantDetails(restaurantid));}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RestaurantListView);
