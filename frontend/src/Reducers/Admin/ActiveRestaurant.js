

const ActiveRestaurant = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVE_RESTAURANT':
      return {
        ...state,
          activeRestaurantId: action.id
      }
      break;
    default:
      return state
  }
}

export default ActiveRestaurant;
