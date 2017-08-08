
const ActiveHome = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVE_HOME':
      return action.restaurant
      break;
    case 'UPDATE_VOTE_REVIEW_IN_STORE':
      let reviews = state.reviews;
      reviews.map( (review) => {
        if(review._id === action.review_id){
          review.votes = action.vote
        }
        return review
      })
      return state
      break;
    default:
      return state
  }
}

export default ActiveHome;
