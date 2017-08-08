const UserReducer = (state = {}, action) => {

  // console.log(action);

  switch (action.type) {
    case "USER_UPDATE":
      return action.user || {};
      break;
    case "ADD_REVIEW_TO_USER":
      let reviewArray = state.reviews;
      reviewArray.push(action.review);
      return Object.assign({}, state, {
        reviews: reviewArray
      })
      break;
    case "UPDATE_USER_REVIEW_IN_STORE":
      return Object.assign({}, state, {
        reviews: state.reviews.map((review,index) => {
          if(review._id===action.reviewUpdated._id){
            review = action.reviewUpdated
          }
          return review
        })
      })
      break;
    case "DELETE_USER_REVIEW_IN_STORE":
      return Object.assign({}, state, {
        reviews: state.reviews.filter((review,index) => {
          return review._id !== action._id
        })
      })
      break;
    default:
      return state;
  }
}

export default UserReducer;
