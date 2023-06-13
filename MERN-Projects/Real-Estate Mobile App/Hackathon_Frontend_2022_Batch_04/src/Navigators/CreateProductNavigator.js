import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import createProduct from '../Screens/CreateProduct/createProduct';


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='createProduct'
            component={createProduct}
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