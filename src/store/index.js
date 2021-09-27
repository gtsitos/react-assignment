import { routerMiddleware } from 'connected-react-router';
import { configureStore } from '@reduxjs/toolkit'
import createRootReducer from './reducers';
import history from '../history';

// DevTools Extension will be enabled by default

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: getDefaultMiddleware => // redux-thunk and redux-logger were added as middleware
    getDefaultMiddleware().concat(routerMiddleware(history))
});

export default store;
