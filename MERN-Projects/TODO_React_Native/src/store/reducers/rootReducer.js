import {combineReducers} from 'redux';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  todoReducer,
});
export default rootReducer;
