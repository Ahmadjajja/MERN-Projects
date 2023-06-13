import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button, Box } from "native-base"
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

//screens
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from "../../Shared/Error"
import Toast from 'react-native-toast-message'


const Register = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const register = () => {

        if (firstName === "" || lastName === "" || userName === "" || email === "" || password === "" || phone === "") {
            setError("Please fill in the form correctly!")
        } else {
            console.log('success')
        }

        let user = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            phone: phone,
            email: email,
        }

        axios
            .post(`${baseURL}users/register`, user)
            .then((res) => {
                if (res.status === 200) {
                    setTimeout(() => {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Registeration Succeeded",
                            text2: "Please login into your account"
                        })
                        props.navigation.navigate("Login")
                        console.log("res", res)
                        console.log("res.data", res.data)
                    }, 500)
                }
            })
            .catch((error) => {
                console.error("error", error)
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something with wrong",
                    text2: "Please try again",
                })
            })






        console.log('user', user)
        setFirstName(''),
        setLastName(''),
        setUserName(''),
        setEmail(''),
        setPhone(''),
        setPassword('')
    }

    return (
        <FormContainer title={"Register"} >
            <Input
                placeholder={"Enter First Name"}
                name={"firstName"}
                id={"firstName"}
                value={firstName}
                onChangeText={(Text) => setFirstName(Text)}
            />
            <Input
                placeholder={"Enter Last Name"}
                name={"lastName"}
                id={"lastName"}
                value={lastName}
                onChangeText={(Text) => setLastName(Text)}
            />
            <Input
                placeholder={"Enter User Name"}
                name={"userName"}
                id={"userName"}
                value={userName}
                onChangeText={(Text) => setUserName(Text)}
            />
            <Input
                placeholder={"Enter Email Address"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(Text) => setEmail(Text.toLowerCase())}
            />
            <Input
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                value={password}
                onChangeText={(Text) => setPassword(Text)}
                secureTextEntry={true}
            />
            <Input
                placeholder={"Enter Phone"}
                name={"phone"}
                id={"phone"}
                value={phone}
                onChangeText={(Text) => setPhone(Text)}
            />
            <View>
                {error ? <Error message={error} /> : null}
            </View>

            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Box 
                width="100%"
                >
                    <Button onPress={() => register()}>
                        Register
                    </Button>
                </Box>
            </View>
            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Box 
                width="100%"
                >
                    <Button onPress={() => props.navigation.navigate("Login")}>
                    Back to Login
                    </Button>
                </Box>
            </View>
        </FormContainer >
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center"
    }
})

export default Register;