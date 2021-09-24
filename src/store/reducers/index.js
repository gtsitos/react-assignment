import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import listsReducer from "./lists";

export default history =>
  combineReducers({
    router: connectRouter(history),
    lists: listsReducer
  });
