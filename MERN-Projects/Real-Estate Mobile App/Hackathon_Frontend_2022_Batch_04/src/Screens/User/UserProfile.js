import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Box, Heading, Button } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios'
import baseURL from "../../assets/common/baseUrl"
//Context API
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from "../../Context/actions/Auth.actions"
import { ProductContext } from '../../Context/store/productGlobal.js';



const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const { setUserPhoneNumber } = useContext(ProductContext)

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
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, //sub is number or the id in this case
                        {
                            headers: { Authorization: `Bearer ${res}` }
                        }
                    )
                    // console.log("token=>", res)
                    .then((user) => {
                        console.log("user.data", user.data)
                        setUserPhoneNumber(user.data.phone)
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
                    {userProfile ? userProfile.userName : "User Name"}
                </Heading>
                <View style={{ marginTop: 20 }}>
                    <Heading size={"sm"} style={{ margin: 10, fontSize: 20 }}>
                        {userProfile ? userProfile.email : "something wrong with userProfile"}
                    </Heading >
                    <Heading size={'lg'}  style={{ margin: 10, fontSize: 20, alignSelf: "center" }}>
                        {userProfile ? userProfile.phone : "something wrong with userProfile"}
                    </Heading >
                </View>
                {/* <View style={{ marginTop: 80 }}> */}
                    <View style={styles.buttonGroup}>
                        <Box width="100%">
                            <Button
                                onPress={() => {
                                    AsyncStorage.removeItem("jwt"), //what does this line means
                                        logoutUser(context.dispatch)
                                }}
                            >
                                Log Out
                            </Button>
                        </Box>
                    </View>
                {/* </View> */}
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
    },
    buttonGroup: {
        width: '80%',
        alignItems: 'center',
    },

})

export default UserProfile;