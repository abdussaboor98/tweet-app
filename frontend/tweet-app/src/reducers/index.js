import { combineReducers } from 'redux';
import { tweetsReducer } from './tweetsReducer';

const reducers = combineReducers({
  tweets: tweetsReducer,
});

export default reducers;
