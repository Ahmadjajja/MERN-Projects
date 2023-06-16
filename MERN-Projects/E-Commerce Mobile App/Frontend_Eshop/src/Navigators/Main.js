import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/FontAwesome"

//stacks
import HomeNavigator from './HomeNavigator'
import CartNavigator from "./CartNavigator"
import UserNavigator from "./UserNavigator"

import CartIcon from "../Shared/CardIcon"

const Tab = createBottomTabNavigator();

const Main = () => {

    return (
        <Tab.Navigator
            initialRouteName='Home'
            tobBarOption={{
                keyboardHidesTopBar: true,
                showLabel: false,
                activeTintColor: '#e91e63'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='home'
                            // style={{ position: 'relative' }}
                            color={color}
                            size={30}
                        />

                    ),
                    headerShown: false,
                }}

            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon
                                name='shopping-cart'
                                style={{ position: 'relative' }}
                                color={color}
                                size={30}
                            />
                            <CartIcon/>
                        </View>


                    ),
                    headerShown: false,
                }}

            />

            {/* <Tab.Screen
                name="Admin"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='cog'
                            color={color}
                            size={30}
                        />

                    ),
                    headerShown: false,
                }}

            /> */}

            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='user'
                            color={color}
                            size={30}
                        />

                    ),
                    headerShown: false,
                }}

            />
        </Tab.Navigator>
    )
}

export default Main