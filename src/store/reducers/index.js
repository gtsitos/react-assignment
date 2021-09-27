import { connectRouter } from 'connected-react-router';
import listsReducer from "./lists";
import plotsReducer from "./plots";

export default history =>
  ({ // The slice reducers are automatically passed to combineReducers
    router: connectRouter(history),
    lists: listsReducer,
    plots: plotsReducer
  });
