import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

//screens
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from "../../Shared/Error"
import Toast from 'react-native-toast-message'


const Register = (props) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const register = () => {

        if (email === "" || name === "" || phone === "" || password === "") {
            setError("Please fill in the form correctly!")
        } else {
            console.log('success')
        }

        let user = {
            email: email,
            name: name,
            phone: phone,
            password: password,
            isAdmin: false
        }

        axios
            .post(`${baseURL}users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    setTimeout(() => {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Registeration Succeeded",
                            text2: "Please login into your account"
                        })
                        props.navigation.navigate("Login")
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something with wrong",
                    text2: "Please try again",
                })
            })






        console.log('user', user)
        setEmail('')
        setName('')
        setPhone('')
        setPassword('')
    }

    return (
        <FormContainer title={"Register"} >
            <Input
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(Text) => setEmail(Text.toLowerCase())}
            />
            <Input
                placeholder={"Enter Name"}
                name={"name"}
                id={"name"}
                value={name}
                onChangeText={(Text) => setName(Text)}
            />
            <Input
                placeholder={"Enter Phone"}
                name={"phone"}
                id={"phone"}
                value={phone}
                onChangeText={(Text) => setPhone(Text)}
            />
            <Input
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                value={password}
                onChangeText={(Text) => setPassword(Text)}
                secureTextEntry={true}
            />
            <View>
                {error ? <Error message={error} /> : null}
            </View>
            <View style={styles.buttonGroup}>
                <Button title="Register" onPress={() => register()} />
            </View>
            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                {/* <Text style={styles.middleText}>
                    Don't have an account yet?
                </Text> */}
                <Button
                    title="Back to Login " onPress={() => props.navigation.navigate("Register")}
                />
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