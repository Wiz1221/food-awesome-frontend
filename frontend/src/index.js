import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { getRestaurant } from './Actions/Admin/Restaurant';
import { getUser} from './Actions/User';

// Redux
import { Provider } from 'react-redux';   // yarn add react-redux
import { initStore } from './Store/Store';  //calling initStore function from Store file, already have createStore inside
//API
import {setActiveRestaurant, getActiveRestaurant} from './API/AdminAPI';

export const store = initStore();

store.subscribe( () => {
  const state = store.getState();
  setActiveRestaurant(state.activeHome);
})

store.dispatch(getRestaurant());
store.dispatch(getUser());

// PUT GET USER HERE
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
