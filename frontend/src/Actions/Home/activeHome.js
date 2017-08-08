import axios from 'axios'
export const activeHome = (restaurant) => {
  return {
    type: 'ACTIVE_HOME',
    restaurant
  }
}
const getReviewStoreInActive = (reviews) => {
  return {
    type: 'GET_REVIEWS',
    reviews
  }
}
export const getReviewOfActive = (restaurant_id) => {
  return (dispatch) => {
    axios.get('/review/' + restaurant_id)
    .then((response) => {
      console.log('response from get review', response.data);
      dispatch(getReviewStoreInActive(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
