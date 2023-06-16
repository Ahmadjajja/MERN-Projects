import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native'
import React from 'react'
import { Avatar, VStack, Text, HStack, Divider, Image } from 'native-base';

var { height, width } = Dimensions.get('window');

import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';


import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

const Confirm = (props) => {

  const finalOrder = props.route.params;
  console.log("final order ", finalOrder)

  const confirmOrder = () => {

    const order = finalOrder.order.order;

    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: "",
          })
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("cart")
          }, 500)
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        })
      })



  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {
          props.route.params ?
            <View style={{ borderWidth: 1, borderColor: 'orange' }}>
              <Text style={styles.shipping}>Shipping to:</Text>
              <View style={{ padding: 8 }}>
                <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                <Text>City: {finalOrder.order.order.city}</Text>
                <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                <Text>Country: {finalOrder.order.order.country}</Text>
              </View>
              <Text style={styles.title}>Items:</Text>
              {
                finalOrder.order.order.orderItems.map((x) => {
                  return (
                    <VStack space={3} divider={<Divider />} w="90%" >
                      <HStack justifyContent="space-between" avatar
                      >
                        <Image size="md" style={{ width: "20%" }} source={{
                          uri: x.product.image
                        }} />
                        <View style={{ width: "80%", paddingLeft: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: "space-around", marginTop: 10, alignItems: 'center' }}>
                          <Text >{x.product.name}</Text>
                          <Text>${x.product.price}</Text>
                        </View>
                      </HStack>
                    </VStack>
                  )
                })
              }
            </View>
            : null
        }
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Button
            title={"Place Order"}
            onPress={confirmOrder}
            // onPress={}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart())
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: 'white'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }, shipping: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: "bold"
  }, title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: "bold"
  }
})
export default connect(null, mapDispatchToProps)(Confirm);