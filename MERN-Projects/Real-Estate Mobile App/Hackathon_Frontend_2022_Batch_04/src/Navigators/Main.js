import React,{ useContext } from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/FontAwesome"

//stacks
import HomeNavigator from './HomeNavigator'
import CartNavigator from "./CartNavigator"
import UserNavigator from "./UserNavigator"
import CreateProductNavigator from './CreateProductNavigator'

import CartIcon from "../Shared/CardIcon"
//Context Api
import AuthGlobal from "../Context/store/AuthGlobal"

const Tab = createBottomTabNavigator();

const Main = () => {
    const context = useContext(AuthGlobal)
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
                name="Wishlist"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon
                                name='heart-o'
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
            {context.stateUser.isAuthenticated === true &&
            <>
            <Tab.Screen
                name="Add"
                component={CreateProductNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon
                                name='plus'
                                style={{ position: 'relative' }}
                                color={color}
                                size={30}
                            />
                        </View>


                    ),
                    headerShown: false,
                }}
            />
            </>
            }
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