import axios from 'axios';
import uuid from 'uuid';

// const loadingRestaurant = () => {
//   return{
//     type: "LOADING_RESTAURANT"
//   }
// }

const storeRestaurant = (restaurant) => {
  return{
    type: "STORE_RESTAURANT",
    restaurant
  }
}

const loadingRestaurantError = (error) => {
  return{
    type: "LOAD_RESTAURANT_ERROR",
    error
  }
}

export const getRestaurant = () => {
  return (dispatch) => {                //thunk allows functions inside actions
    // dispatch(loadingRestaurant());
    axios.get('/api')
    .then( (response)=>{
      dispatch(storeRestaurant(response.data));
    }).catch( (error) =>{
      dispatch(loadingRestaurantError(error));
    })
  }
}

const addRestaurantInStore = (newRestaurant) => {
  return {
    type: 'ADD_RESTAURENT',
    newRestaurant
  }
}
const addRestaurant_id = (newRestaurantPicHome, newRestaurantPicHomePublicId, newRestaurantId,newRestaurant_id) => {
  return {
    type: 'ADD_RESTAURENT_ID',
    newRestaurantPicHome,
    newRestaurantPicHomePublicId,
    newRestaurantId,
    newRestaurant_id
  }
}

export const addRestaurant = (picHome, picIndividual, newRestaurant) => {
  return (dispatch) => {
    newRestaurant.id = uuid.v4();
    // add newRestaurant to store first while waiting for backend to update
    dispatch(addRestaurantInStore(newRestaurant));

    // here picHome is a file
    let picHomeToBackEnd = new FormData();
    picHomeToBackEnd.append('picHome', picHome);
    picHomeToBackEnd.append('name', newRestaurant.name);
    picHomeToBackEnd.append('star', newRestaurant.star);
    picHomeToBackEnd.append('describeHome', newRestaurant.describeHome);
    picHomeToBackEnd.append('describeIndividual', newRestaurant.describeIndividual);
    picHomeToBackEnd.append('id', newRestaurant.id);

    //sending newRestaurant to backend
    axios.post('/api/',picHomeToBackEnd)
    .then( (response)=>{
      // here picHome is a url. needs local uuid to update restaurant with database id
      dispatch(addRestaurant_id(response.data.picHome,response.data.picHomePublicId, response.data.id,response.data._id));
    }).catch( (error) =>{
      console.log(error);
      dispatch(loadingRestaurantError(error));
    })
  }
}

const updateRestaurantInStore = (restaurant) => {
  return {
    type: 'UPDATE_RESTAURENT',
    restaurant
  }
}

const updateRestaurantInStorePicURL = (url, id) => {
  return {
    type: 'UPDATE_RESTAURENT_PIC_URL',
    url,
    id
  }
}


export const updateRestaurant = (picHome,restaurant) => {
  return (dispatch) => {                //thunk allows functions inside actions
    // dispatch function to send info to store first
    dispatch(updateRestaurantInStore(restaurant));

    // here picHome is a file
    let picHomeToBackEnd = new FormData();
    picHomeToBackEnd.append('picHome', picHome);
    picHomeToBackEnd.append('name', restaurant.name);
    picHomeToBackEnd.append('star', restaurant.star);
    picHomeToBackEnd.append('address', restaurant.address);
    picHomeToBackEnd.append('describeHome', restaurant.describeHome);
    picHomeToBackEnd.append('describeIndividual', restaurant.describeIndividual);
    picHomeToBackEnd.append('picHomePublicId', restaurant.picHomePublicId)

    // axios function to send info to backend database
    axios.put('/api/'+restaurant._id,picHomeToBackEnd)
    .then( (response)=>{
      // here picHome is a new url
      dispatch(updateRestaurantInStorePicURL(response.data.picHome, response.data.id))
    }).catch( (error) =>{
      dispatch(loadingRestaurantError(error));
    })
  }
}

const deleteRestaurantInStore = (_id) => {
  return {
    type: 'DELETE_RESTAURENT',
    _id
  }
}

export const deleteRestaurant = (_id) => {
  return (dispatch) => {                //thunk allows functions inside actions
    dispatch(deleteRestaurantInStore(_id));
    axios.delete('/api/'+_id)
    .then( (response)=>{
      console.log(response.data);
    }).catch( (error) =>{
      dispatch(loadingRestaurantError(error));
    })
  }
}
