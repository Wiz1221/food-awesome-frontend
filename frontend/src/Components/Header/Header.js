import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { getUser } from '../../Actions/User';
import './Header.css';
import logo from './logo.png';
import {
  Link
} from 'react-router-dom';
import { store } from '../../index';
import { push } from 'react-router-redux';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    }
  }

  logout = (e) => {
    e.preventDefault();
    axios.get('/auth/logout')
    .then( (response) => {
      console.log("AJAX: Logged out @ '/auth/logout'");
      store.dispatch(push('/'));
      this.props.getUser();
      // window.location.href = "/";
    })
    .catch((error)=> {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="row header">
        <div className="col-sm-2 col-md-2 col-lg-2" id="logo">
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>
        </div>
        <div className="col-sm-4 col-md-5 col-lg-7" id="headerSearchBar">
          {/*<div className="input-group stylish-input-group">
            <input type="text" className="form-control"  placeholder="Search" />
            <span className="input-group-addon">

                <button type="submit" onClick=this.onClick>
                    <span className="glyphicon glyphicon-search"></span>
                </button>
            </span>
        </div>*/}
        </div>

        <div className="col-sm-6 col-md-5 col-lg-4 pull-right">
          { this.props.user.email === undefined ?
            <Link to="/login"><div className="header-button login-button">Login</div></Link> :
            ( <div>
                  <div className="header-display col-sm-4 col-md-4">{this.props.user.email}</div>

                  <Link to="/account"><div className="header-display header-button account-button col-sm-4 col-md-4">Your Profile</div></Link>


                  <a onClick={this.logout}><div className="header-display header-button logout-button col-sm-4 col-md-4">Logout</div></a>

              </div>
            )
          }
        </div>

      </div>

    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser:() => {dispatch(getUser());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
