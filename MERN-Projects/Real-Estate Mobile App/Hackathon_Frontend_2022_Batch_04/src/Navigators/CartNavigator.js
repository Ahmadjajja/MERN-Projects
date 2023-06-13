import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Cart from '../Screens/Cart/Cart';
import CheckoutNavigator from './CheckoutNavigator';


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='cart'
            component={Cart}
            options={{
                headerShown: false
            }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator(params) {
    return <MyStack />
}