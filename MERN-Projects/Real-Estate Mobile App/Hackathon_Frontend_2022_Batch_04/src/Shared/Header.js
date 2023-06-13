import React from 'react'
import { View, Text, StyleSheet, Image,SafeAreaView } from 'react-native'
import icon from "react-native-vector-icons/FontAwesome"

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      {/* <Text>Header</Text> */}
      <Image
      source={require('../assets/icons8-real-estate-24.png')}
      resizeMode="contain"
      style={{height: 50}}

      />
    </SafeAreaView>
  )

}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'center',
        // padding: 20,
        marginTop: 20, //Todo: Delete
    }
  })