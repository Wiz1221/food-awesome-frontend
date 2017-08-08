import React, {Component} from 'react';
import { connect } from 'react-redux';
import Compose from './Compose/Compose';
import RestaurantList from './RestaurantList/RestaurantList';

import './Admin.css';

class Admin extends Component {

  render() {
    return (
      <div>
        <div className="App container">
          <div className="row todo">
            <div className="col-md-3" id="RestaurantList">
              <RestaurantList/>
            </div>
            <div className="col-md-9" id="RestaurantEdit">
              <Compose />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.admin,
    user: state.user
  }
}

export default connect(mapStateToProps)(Admin);
