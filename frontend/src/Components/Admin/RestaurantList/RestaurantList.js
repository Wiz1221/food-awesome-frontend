import React, {Component} from 'react';
import { connect } from 'react-redux';
import RestaurantListView from '../RestaurantListView/RestaurantListView';


class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      nameToSearch: "",
    }
  }

  adminSearch = (event) => {
    this.setState({
      nameToSearch: event.target.value
    })
  }

  searchFunction = (thingToSearchIn,nameToSearch) => {
    nameToSearch = nameToSearch.toLowerCase();
    let thingToShow = thingToSearchIn.filter((elem,index) => {
      return elem.name.toLowerCase().includes(nameToSearch);
    })
    return thingToShow;
  }

  renderRestaurants = () => {

    let restaurantArray = this.props.restaurants;
    if(restaurantArray.length===0){
      return (<div>no Restaurant yet</div>)
    }
    restaurantArray = this.searchFunction(restaurantArray,this.state.nameToSearch)
    return restaurantArray.map( (restaurant,index) => {
      console.log('render')
      console.log(restaurant.name)
      return (<RestaurantListView restaurant={restaurant} key={restaurant.id}/>)
    })
  }

  render() {
    return (
      <div className="row" id="restaurantList">
        <div className="col-md-12" id="search">
          <input className="form-control" type="text" placeholder="Search" onChange={this.adminSearch}/>
        <div className="col-md-12 list-group" id="renderRestaurants">
          {this.renderRestaurants()}
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RestaurantList);
