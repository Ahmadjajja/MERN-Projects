import { legacy_createStore as createStore } from 'redux'
import { combineReducers, applyMiddleware } from 'redux';
// import { ThunkMiddleware } from "redux-thunk";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";


import CartItems from './Reducers/CartItem';

const reducers = combineReducers({
    CartItems: CartItems
})

const store = createStore(
    reducers,
    // composeWithDevTools(ThunkMiddleware)
    applyMiddleware(thunk)
)

export default store





























// const Store = () => {
//   return (
//     <View>
//       <Text>Store</Text>
//     </View>
//   )
// }

// export default Store