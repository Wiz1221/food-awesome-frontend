import React, { Component } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../Actions/User';
import Header from '../Header/Header';
import './Login.css';
import { store } from '../../index';
import { push } from 'react-router-redux';

/**
 * Login
 */
export class Login extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = {
        email:"",
        password:"",
        error:"",
        user:""
    }
  }

  onChange = (e) => {
    let state = this.state;
    let key = e.target.id;
    let value = e.target.value;

    state[key] = value;
    //console.log(state);
    this.setState(state);
    console.log(state);
  }

  localLogin = (e) => {
    e.preventDefault();
    console.log("localLogin");
    console.log(this.state);
    axios.post('/auth/login', this.state)
      .then( (response) => {
        let data = response.data;
        console.log(data);

        if(data.error){
          console.log(data.message);
          this.setState({
            error:data.message
          });
        }else{
          console.log("AJAX: Logged in @ '/auth/user'");
          this.setState({
            user:data._id
          });
          console.log(store)
          //react-router-redux to dispatch routes from non-components
          store.dispatch(push('/'));
          this.props.getUser();
          // window.location.href = "/";
        }
      })
      .catch((error)=> {
        console.log(error)
        console.error("AJAX: Could not login @ '/auth/login'")
        this.setState({
          error:"Notify the dev team!"
        });
      });
  }

  localSignup = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', this.state)
      .then( (response) => {
        let data = response.data;
        if(data.error){
          console.log(data.message)
          this.setState({
            error:data.message
          });
        }else{
          console.log("AJAX: Signed up @ '/auth/signup'");
          store.dispatch(push('/'));
          this.props.getUser();
          // window.location.href = "/";
          this.setState({
            error:"Sign up successful!"
          });
        }
      })
      .catch((error)=> {
        console.error("AJAX: Could not signup @ '/auth/signup'",error)
        this.setState({
          error:"Notify the dev team!"
        });
      });
  }

  facebookLogin = (e) => {
    e.preventDefault();
    window.location.href = "/auth/facebook";
  }

  render() {
    return (
      <div>
      <Header/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="login" id="Login">
              <form>
                <div className="error">{this.state.error}</div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email"
                         className="form-control"
                         id="email"
                         placeholder="Email"
                         value={this.state.email}
                         onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password"
                         className="form-control"
                         id="password"
                         placeholder="Password"
                         value={this.state.password}
                         onChange={this.onChange}/>
                </div>
                <button type="submit"
                        className="blue-button-primary"
                        onClick={this.localLogin}>Login</button>
                <button type="submit"
                        className="white-button-default submit"
                        onClick={this.localSignup}>Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

// update UI from state
const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

// update state in store
const mapDispatchToProps = (dispatch) => {
  return {
    getUser:() => {dispatch(getUser());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
