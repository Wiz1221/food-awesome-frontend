import { createStore, compose, combineReducers, applyMiddleware } from 'redux'; // compose is used for debugging here
import RestaurantReducer from '../Reducers/Admin/Restaurant';
import ActiveRestaurantReducer from '../Reducers/Admin/ActiveRestaurant';

import activeHomeReducer from '../Reducers/Home/activeHome'

import UserReducer from '../Reducers/UserReducer';
import UserReviewReducer from '../Reducers/User/Review';
import ActiveUserReviewReducer from '../Reducers/User/ActiveUserReview';

import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// // Create a history of your choosing (we're using a browser history in this case)
export let history = createHistory();

export let initStore = () => {

  const reducer = combineReducers({
    restaurants: RestaurantReducer,
    activeRestaurant: ActiveRestaurantReducer,

    activeHome: activeHomeReducer,

    user: UserReducer,

    userReview: UserReviewReducer,
    activeUserReview: ActiveUserReviewReducer,


  });

  // Build the middleware for intercepting and dispatching navigation actions
  const historyWare = routerMiddleware(history);

  const store = createStore( reducer,     // passing all reducer-- each reducer creates as an array inside this.props
    compose(applyMiddleware(thunk,historyWare),
    window.devToolsExtension ? window.devToolsExtension() : f => f      // f is just a way to do nothing
  ) )

  return store;
  // return [store,history];
}
