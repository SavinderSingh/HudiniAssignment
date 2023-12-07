import {combineReducers} from 'redux';
import homeSlice from './homeSlice';

export default combineReducers({
  home: homeSlice,
});
