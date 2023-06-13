import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, VStack, Text, HStack, Divider, Image } from 'native-base'

const CartItem = (props) => {
  const data = props.item.item.product;
  // console.log("props in CartItem=>", props)
  // console.log("data in CartItem=>", data)
  console.log()

  const [quantity, setQuantity] = useState(props.item.quantity)
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("ProductDetails", { item: data })
    }}
    >
      <VStack
        space={3} 
        divider={<Divider />}
        style={styles.listItem}
        // w="90%"
        key={Math.random()} //this function will generate random key
      >
        <HStack justifyContent="space-between" avatar
        >
          <Image size="20" style={{ width: "25%" }} source={{
            uri: data.image
              ? data.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'

          }} alt='img' />
          <View style={[styles.body, { width: "75%" }]}>
            <Text style={{ fontWeight: "bold" }}>{data.tital}</Text>
            <Text style={{ fontWeight: "bold" }}>$ {data.price}</Text>
          </View>
        </HStack>
      </VStack>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingTop: 7,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 40,
    marginStart: 5
  }, listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  }
})

export default CartItem