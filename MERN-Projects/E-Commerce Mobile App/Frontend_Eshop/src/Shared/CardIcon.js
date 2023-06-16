import { StyleSheet } from 'react-native'
import React from 'react'
import { Badge , Text } from 'native-base'

//REDUX
import { connect } from 'react-redux'

const CardIcon = (props) => {
  return (
    <>
    {
        props.cartItems.length? (
            <Badge style = {styles.badge}>
                <Text style={styles.text}>{props.cartItems.length}</Text>
            </Badge>
        ): null
    }
    </>
  )
} 

const mapStateToProps = (state) => {
    const {CartItems} = state;
    return {
        cartItems: CartItems
    }
}

const styles = StyleSheet.create({
    badge: {
        width: 25,
        position: 'absolute',
        flex: 1,
        justifyContent : 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: -4,
        right: -15,
        backgroundColor: "red",
        // borderRadius: 0
    },
    text: {
        fontSize: 12,
        // width: 100,
        fontWeight: 'bold',
        color: 'white'
    }
})
export default connect(mapStateToProps)(CardIcon)