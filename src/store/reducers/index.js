import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import listsReducer from "./lists";
import plotsReducer from "./plots";

export default history =>
  combineReducers({
    router: connectRouter(history),
    lists: listsReducer,
    plots: plotsReducer
  });
