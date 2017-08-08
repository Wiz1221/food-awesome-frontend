import React, {Component} from 'react';
import {connect} from 'react-redux';
import {activeHome} from '../../Actions/Home/activeHome';
import Header from '../Header/Header';
import Scroll from './Scroll/Scroll';
import Poster from './Poster/Poster';
import './Individual.css';

export class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: this.props.active,
    }
  }

  componentWillMount() {
    if(!this.props.active.hasOwnProperty('name')){
      window.location.href = "/"
    }
  }
  render() {
    //console.log('thispropsactive',this.props.active)
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <div className="row">
            <Scroll restaurant={this.props.active}/>
            <Poster img={this.props.active.picHome}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    active: state.activeHome,

  }
}

export default connect(mapStateToProps)(Individual);
