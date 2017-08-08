import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addRestaurant, updateRestaurant, deleteRestaurant } from '../../../Actions/Admin/Restaurant';

class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRestaurant: {},
      activeRestaurant: "",
      picHome: null,
      picIndividual: null
    }
  }

  // name: "",
  // star:"",
  // describeHome:"",
  // describeIndividual:"",
  // picHome:"",
  // picIndividual:""

  componentWillReceiveProps(nextProps){
    let activeRestaurantObject = {};
    nextProps.restaurants.forEach((restaurant,index,arr) => {
      if(restaurant.id===nextProps.activeRestaurant.activeRestaurantId){
         activeRestaurantObject = restaurant
      }
    })
    this.setState({
      newRestaurant: activeRestaurantObject
    })
  }

  onChange = (event) => {
    let newRestaurant = this.state.newRestaurant;
    if(event.target.id==="picHome"){
      this.setState({
        picHome: event.target.files[0]
      })
    }else if(event.target.id==="picIndividual"){
      this.setState({
        picIndividual: event.target.files[0]
      })
    }else{
      newRestaurant[event.target.id] = event.target.value;
    }
    this.setState({
      newRestaurant: newRestaurant
    })
  }

  addNewRestaurant = () => {
    let newRestraurant = this.state.newRestaurant;
    let picHome = this.state.picHome;
    let picIndividual = this.state.picIndividual;
    this.props.addRestaurant(picHome, picIndividual, newRestraurant);
  }

  updateRestaurant = () => {
    let newRestraurant = this.state.newRestaurant;
    this.props.updateRestaurant(this.state.picHome, newRestraurant);
  }

  deleteRestaurant = () => {
    let restraurant_id = this.state.newRestaurant._id;
    this.props.deleteRestaurant(restraurant_id);
  }

  render() {
    return (
      <div>Admin Page
      <div className="form-group">
        <p>{this.state.newRestaurant.id? "the front end id is "+ this.state.newRestaurant.id : ""}</p>
        <p>{this.state.newRestaurant._id? "the back end id is "+ this.state.newRestaurant._id : ""}</p>
        <label>Name</label>
        <input id = "name"
               type="text"
               className="form-control"
               aria-describedby="emailHelp"
               placeholder="Name"
               onChange={this.onChange}
               value={this.state.newRestaurant.name? this.state.newRestaurant.name: ""}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleSelect2">Number of initial Stars</label>
        <input id = "star"
               type="number"
               className="form-control"
               aria-describedby="emailHelp"
               placeholder="Star"
               onChange={this.onChange}
               value={this.state.newRestaurant.star? this.state.newRestaurant.star: ""}/>
      </div>
      <div className="form-group">
        <label>Address</label>
        <textarea id="address"
                  className="form-control"
                  name="address"
                  rows={3}
                  placeholder="address"
                  onChange={this.onChange}
                  value={this.state.newRestaurant.address? this.state.newRestaurant.address: ""}/>
      </div>
      <div className="form-group">
        <label>desciption in home page</label>
        <textarea id="describeHome"
                  className="form-control"
                  name="forHome"
                  rows={3}
                  placeholder="description in home"
                  onChange={this.onChange}
                  value={this.state.newRestaurant.describeHome? this.state.newRestaurant.describeHome: ""}/>
      </div>

      <div className="form-group">
        <label>desciption in individual page</label>
        <textarea id="describeIndividual"
                  className="form-control"
                  name="forIndividual"
                  rows={3}
                  placeholder="description in individual"
                  onChange={this.onChange}
                  value={this.state.newRestaurant.describeIndividual? this.state.newRestaurant.describeIndividual: ""}/>
      </div>
      <div className="form-group">
        <label>Picture input</label>
        <input id="picHome"
               type="file"
               className="form-control-file"
               aria-describedby="fileHelp"
               onChange={this.onChange}
               />
      </div>
      <button type="submit" className="blue-button-primary" onClick={this.addNewRestaurant}>Add New Restaurant</button>
      <button type="submit" className="blue-button-primary" onClick={this.updateRestaurant}>Update</button>
      <button type="submit" className="red-button-danger" onClick={this.deleteRestaurant}>Delete</button>
       </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    activeRestaurant: state.activeRestaurant
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRestaurant: (picHome, picIndividual, newRestraurant) => {dispatch(addRestaurant(picHome, picIndividual, newRestraurant));},
    updateRestaurant: (picHome, newRestraurant) => {dispatch(updateRestaurant(picHome, newRestraurant));},
    deleteRestaurant: (_id) => {dispatch(deleteRestaurant(_id));}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Compose);
