import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native'
import {Heading} from 'native-base'
import React from 'react'

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading >{props.title}</Heading>
      {props.children}
    </ScrollView>
  )
} 

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FormContainer