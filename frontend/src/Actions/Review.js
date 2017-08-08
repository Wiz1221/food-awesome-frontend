import axios from 'axios';

const loadingReviewError = (error) => {
  return{
    type: "LOAD_REVIEW_ERROR",
    error
  }
}

const addReviewIntoRestaurantInStore = (restaurant_id, review) => {
  return {
    type: 'ADD_REVIEW_TO_RESTAURANT',
    restaurant_id,
    review,
  }
}

const addReviewIntoUserInStore = (review) => {
  return {
    type: 'ADD_REVIEW_TO_USER',
    review,
  }
}

export const addReviewWithPic = (picReview, newReview) =>{
  return (dispatch) => {

    // here picReview is a file
    let picReviewToBackEnd = new FormData();
    picReviewToBackEnd.append('picReview', picReview);
    picReviewToBackEnd.append('title', newReview.title);
    picReviewToBackEnd.append('star', newReview.star);
    picReviewToBackEnd.append('description', newReview.description);
    picReviewToBackEnd.append('user_id', newReview.user_id);

    //sending newReview to backend. no special argument, returns url, public_id, database id
    axios.post('/review/postReviewWithPic/'+ newReview.restaurant_id, picReviewToBackEnd)
    .then( (response)=>{
      dispatch(addReviewIntoRestaurantInStore(newReview.restaurant_id,response.data));
      dispatch(addReviewIntoUserInStore(response.data));
    }).catch( (error) =>{
      dispatch(loadingReviewError(error));
    })
  }
}


export const addReviewWithoutPic = (newReview) =>{
  return (dispatch) => {
    // dispatch(addReviewIntoRestaurantInStore(newReview.restaurant_id,newReview));

    axios.post('/review/postReviewWithoutPic/'+ newReview.restaurant_id, newReview)
    .then( (response)=>{
      dispatch(addReviewIntoRestaurantInStore(newReview.restaurant_id,response.data));
      dispatch(addReviewIntoUserInStore(response.data));
    }).catch( (error) =>{
      dispatch(loadingReviewError(error));
    })
  }
}

// const addUserReviewToStore = (reviews) => {
//   return {
//     type: 'ADD_USER_REVIEW_TO_STORE',
//     reviews
//   }
// }
//
// export const getReviewOfUser = (user_id) => {
//   return (dispatch) => {
//     axios.get('/review/userReviews/'+user_id)
//     .then( (response) => {
//       console.log(response.data)
//       dispatch(addUserReviewToStore(response.data))
//     }).catch( (error) => {
//       dispatch(loadingReviewError(error));
//     })
//   }
// }

export const activeReviewDetails = (review_id) => {
  return {
    type: "ACTIVE_USER_REVIEW",
    review_id
  }
}

const updateUserReviewInStore = (reviewUpdated) => {
  return {
    type: "UPDATE_USER_REVIEW_IN_STORE",
    reviewUpdated
  }
}
const updateVoteReviewInStore = (vote, review_id) => {
  return {
    type: 'UPDATE_VOTE_REVIEW_IN_STORE',
    vote,
    review_id
  }
}
export const updateVote = (review_id, vote) => {

  return (dispatch) => {
    axios.put('/review/updateVote/' + review_id, {vote: vote})
    .then( (response) => {
      //console.log('response data', response.data)
      dispatch(updateVoteReviewInStore(response.data.votes, response.data._id))
    }).catch( (error) => {
      dispatch(loadingReviewError(error))
    })
  }
}

export const updateReviewWithPic = (picReview, review) => {
  return (dispatch) => {
    // here picReview is a file
    let picReviewToBackEnd = new FormData();
    picReviewToBackEnd.append('picReview', picReview);
    picReviewToBackEnd.append('title', review.title);
    picReviewToBackEnd.append('star', review.star);
    picReviewToBackEnd.append('description', review.description);
    picReviewToBackEnd.append('picReviewPublicId', review.picReviewPublicId)

    // axios function to send info to backend database
    axios.put('/review/updateReviewWithPic/'+review._id,picReviewToBackEnd)
    .then( (response)=>{
      // here picReview is a new url
      dispatch(updateUserReviewInStore(response.data))
    }).catch( (error) =>{
      dispatch(loadingReviewError(error));
    })
  }
}

export const updateReviewWithoutPic = (review) => {
  return (dispatch) => {
    // axios function to send info to backend database
    axios.put('/review/updateReviewWithoutPic/'+review._id,review)
    .then( (response)=>{
      dispatch(updateUserReviewInStore(response.data))
    }).catch( (error) =>{
      dispatch(loadingReviewError(error));
    })
  }
}

const deleteUserReviewInStore = (_id) => {
  return {
    type: "DELETE_USER_REVIEW_IN_STORE",
    _id
  }
}

const deleteReviewFromRestaurant = (review_id, restaurant_id) => {
  return {
    type: "DELETE_REVIEW_FROM_RESTAURANT_IN_STORE",
    review_id,
    restaurant_id
  }
}

export const deleteReview = (review_id, restaurant_id) => {
  return (dispatch) => {
    dispatch(deleteUserReviewInStore(review_id));
    dispatch(deleteReviewFromRestaurant(review_id, restaurant_id));

    axios.delete('/review/deleteReview/'+review_id)
    .then( (response)=>{

    }).catch( (error) =>{
      dispatch(loadingReviewError(error));
    })
  }
}
