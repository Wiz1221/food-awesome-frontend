import React, {Component} from 'react';
import { connect } from 'react-redux';
import Compose from './Compose/Compose';
import RestaurantList from './RestaurantList/RestaurantList';
import Header from '../Header/Header';

import './Admin.css';

class Admin extends Component {

  // componentWillMount(){
  //   if(this.props.user.email === ("gy89@gmail.com"||"dhea@dhea.com"||"bryan@gmail.com")){
  //     console.log(this.props.user)
  //   }else{
  //     console.log("else",this.props.user)
  //     window.location.href='/';
  //   }
  // }

  render() {
    return (
      <div>
        <Header/>
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

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
