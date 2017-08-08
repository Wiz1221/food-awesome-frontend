
const Review = (state=[], actions) => {
  switch (actions.type) {
    case "ADD_USER_REVIEW_TO_STORE":
      return actions.reviews || {};
      break;

    // case "UPDATE_USER_REVIEW_IN_STORE":
    //   return state.map( (review,index) => {
    //             if(review._id===actions.reviewUpdated._id){
    //               review = actions.reviewUpdated
    //             }
    //             return review
    //           })
    //   break;
    // case "DELETE_USER_REVIEW_IN_STORE":
    //   return state.filter( (review,index) => {
    //             return review._id !== actions._id
    //           })
    //   break;

    default:
      return state
  }
}

export default Review;
