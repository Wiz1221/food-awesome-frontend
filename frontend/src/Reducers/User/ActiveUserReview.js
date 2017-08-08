
const ActiveUserReview = (state={},actions) => {
  switch (actions.type) {
    case "ACTIVE_USER_REVIEW":
      return actions.review_id || {};
      break;
    default:
      return state;
  }
}

export default ActiveUserReview;
