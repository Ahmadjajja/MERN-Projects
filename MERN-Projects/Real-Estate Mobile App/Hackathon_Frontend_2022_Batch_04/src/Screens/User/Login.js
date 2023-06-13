import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Box } from "native-base"

import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from "../../Shared/Error"

//Toast
import Toast from 'react-native-toast-message'

//context
import AuthGlobal from "../../Context/store/AuthGlobal"
import { loginUser } from "../../Context/actions/Auth.actions"


const Login = (props) => {
    const context = useContext(AuthGlobal)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("User Profile");
        }
    }, [context.stateUser.isAuthenticated])


    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === "") {
            setError("Please fill in your credential")
        } else {
            loginUser(user, context.dispatch)

        }
        console.log('user', user)
        setEmail('')   //ECTT(extra code than tutor)
        setPassword('')  //ECTT
    };

    return (
        <FormContainer title={"Login"} >
            <Input
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(Text) => setEmail(Text.toLowerCase())}
            />
            <Input
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(Text) => setPassword(Text)}
            />
            <View  style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
            <Box width="100%">
                <Button onPress={() => handleSubmit()}>
                    Login
                </Button>
            </Box>
            </View>
            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Text style={styles.middleText}>
                    Don't have an account yet?
                </Text>
                <Box 
                width="100%"
                >
                    <Button onPress={() => props.navigation.navigate("Register")}>
                        Register
                    </Button>
                </Box>
            </View>
        </FormContainer >
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center',
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center"
    }
})

export default Login;