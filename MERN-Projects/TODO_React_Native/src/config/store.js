import {createStore} from 'redux';
import rootReducer from './../store/reducers/rootReducer';
const store = createStore(rootReducer);
export default store;
