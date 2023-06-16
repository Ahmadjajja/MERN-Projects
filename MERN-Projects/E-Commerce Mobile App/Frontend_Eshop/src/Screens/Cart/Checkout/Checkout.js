import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Select, Box, CheckIcon, Center, KeyboardAvoidingView } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'
import { KeyboardAwareScrollView  } from "react-native-keyboard-aware-scroll-view";

//REDUX 
import { connect } from 'react-redux'

import countries from '../../../assets/countries.json'


const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => {
      setOrderItems();
    }
  }, [])

  const CheckOut = () => {
    console.log("orders", orderItems)
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user,
      zip,

    }

    props.navigation.navigate("Payment", { order: order })
  }

  return (
    <KeyboardAwareScrollView   
      viewIsInsideTabBar={true}
      // extraHeight={200}
      enableOnAndroid={true}
      
    >
      <FormContainer title={"Shipping Address"} style={styles.CheckoutContainer}>
        <Input
          placeholder={"Phone"}
          name={"Phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        {/* <Select
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" color={"#007aff"}></Icon>}
          style={{ width: undefined }}
          selectedValue={country}
          placeholder="Select your country"
          placeholderStyle={{ color: "#007aff" }}
          onValueChange={(e) => setCountry(e)}
        >
          {countries.map((c) => {
            return <Select.Item
              key={c.code}
              label={c.name}
              value={c.name}
            />
          })}
        </Select> */}
        <Center>
          <Box w="3/4" maxW="300">
            <Select selectedValue={country} minWidth="200" accessibilityLabel="Choose Country" placeholder="Choose country" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setCountry(itemValue)}>
          {countries.map((c) => {
            return <Select.Item
              key={c.code}
              label={c.name}
              value={c.name}
            />
          })}
            </Select>
          </Box>
        </Center>
        <View style={{ width: "100%", alignItems: "center" ,marginTop: 5}}>
          <Button title="Confirm"
            onPress={() => CheckOut()}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView   >
  )
}

const mapStateToProps = (state) => {
  console.log("checkout",state)
  const { CartItems } = state;
  return {
    cartItems: CartItems,
  }
}

const styles = StyleSheet.create({
  CheckoutContainer: {
    marginTop: 100
  }
})


export default connect(mapStateToProps)(Checkout)