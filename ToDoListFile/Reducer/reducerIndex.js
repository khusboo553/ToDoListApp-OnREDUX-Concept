import { combineReducers } from 'redux';
import homeReducer from './homeReducer';

const ReducerIndex = combineReducers({
  users: homeReducer,

});


export default ReducerIndex;
