import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';

const Error = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        margin: 10
    }, text: {
        color: 'red'
    }
})

export default Error;