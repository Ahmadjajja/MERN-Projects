import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProductContainer from '../Screens/Products/ProductContainer'
import SingleProducts from '../Screens/Products/SingleProducts'

const Stack = createStackNavigator();

const MyStack = () => {

  return (
    <Stack.Navigator>
        <Stack.Screen 
        name='Home'
        component={ProductContainer}
        options = {{
            headerShown: false,
        }}
        />
        <Stack.Screen 
        name='ProductDetails'
        component={SingleProducts}
        options = {{
            headerShown: false,
        }}
        />
    </Stack.Navigator>
  )
}

export default function HomeNavigator(params) {
    return <MyStack />
}