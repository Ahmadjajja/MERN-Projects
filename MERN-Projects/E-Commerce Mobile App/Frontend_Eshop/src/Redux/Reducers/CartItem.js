import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from "../Constants"

const CartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload] // action.payload will be the items in this case we will  pass through this actions
        case REMOVE_FROM_CART:
            return state.filter( cartItem => cartItem !== action.payload)
        case CLEAR_CART:
            return state = []
    }
    return state;
}

export default CartItems;