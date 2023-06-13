import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from "../Screens/User/Login"
import Register from "../Screens/User/Register"
import UserProfile from "../Screens/User/UserProfile"

//Context Api
import AuthGlobal from "../Context/store/AuthGlobal"

const Stack = createStackNavigator();
function MyStack() {
    const context = useContext(AuthGlobal)


    return <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato' },
        }}
    >
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="User Profile"
                    component={UserProfile}
                    options={{
                        headerShown: false
                    }}
                />
    </Stack.Navigator>
}

export default function UseNavigator() {
    return <MyStack />
}