import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Box, Heading } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios'
import baseURL from "../../assets/common/baseUrl"

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from "../../Context/actions/Auth.actions"



const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {
            props.navigation.navigate("Login")
            console.log("we need to login again")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                console.log("context.stateUser.user.userId=>", context.stateUser.user.userId)
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId }`, //sub is number or the id in this case
                        {
                            headers: { Authorization: `Bearer ${res}` }
                        }
                    )
                // console.log("token=>", res)
                    .then((user) => {
                        console.log("user.data", user.data)
                        setUserProfile(user.data)
                    })
            })
            .catch((error) => console.log(error))

        return () => {
            console.log(userProfile)
            setUserProfile();
        }

    }, [context.stateUser.isAuthenticated])

    return (
        <Box style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Heading style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : "name"}
                </Heading>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : "something wrong with userProfile"}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : "something wrong with userProfile"}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button
                        title={"Sign Out"}
                        onPress={() => {
                            AsyncStorage.removeItem("jwt"), //what does this line means
                                logoutUser(context.dispatch)
                        }}
                    />
                </View>
            </ScrollView>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60,
    }

})

export default UserProfile;