import React, { useContext } from 'react'
import { View, Dimensions, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import { VStack, Text, HStack, Divider } from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'


import { Icon } from 'react-native-vector-icons/FontAwesome'
import CartItem from "./CartItem"

//  REDUX
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import AuthGlobal from "../../Context/store/AuthGlobal"

var { height, width } = Dimensions.get('window')

const Cart = (props) => { 

  const context = useContext(AuthGlobal)
  
  
  console.log("props from Cart ",props)
  
  var total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  })
  console.log(total)
  return (
    <>
      {props.cartItems.length ? (
        <View style={{ height: "100%", backgroundColor: "white" }}>
          <Text style={{ alignSelf: 'center', fontSize: 30, paddingTop: 20 }}>
            Wishlist
          </Text>
          {/* <ScrollView> */}
          {
          console.log("data from Cart.js => ", props.cartItems)
          }
          <SwipeListView
            data={props.cartItems}
            renderItem={(data, rowMap) => {
              return (<CartItem item={data} navigation={props.navigation}/>) //little change and confusion
            }}
            renderHiddemItem={(data, rowMap) => {
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  onPress={() => props.removeFromCart(data.item)}
                  style={styles.hiddenButton}
                >
                  <Icon name="trash" color={"white"} size={38} />
                </TouchableOpacity>
              </View>
            }}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
          <HStack justifyContent="center" avatar style={{marginBottom: 10, width:width }} 
          >
            <TouchableOpacity style={{width: width / 2}}>
              <Button
                color="red"
                title="Clear Wishlist"
                onPress={() => props.clearCart()}

              />
            </TouchableOpacity>
          </HStack>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text >Looks like your Wishlist is empty!</Text>
          <Text >You can add your favourite products to Wishlist</Text>
        </View>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  // console.log("state that coming from redux", state)
  const { CartItems } = state;  //this state we are getting from REDUX to use in this component
  return {
    cartItems: CartItems, //this variable will assign to props
  }
}

const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch)
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart())
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: "center",
    paddingBottom: 80
  }, bottomContainer: {
    flexDirection: 'row',
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white'
  }, price: {
    fontSize: 18,
    color: 'red',
    paddingBottom: 5,
    alignSelf: 'center'
  }, buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  }, hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  }, hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingright: 25,
    height: 70,
    width: width / 1.2,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)