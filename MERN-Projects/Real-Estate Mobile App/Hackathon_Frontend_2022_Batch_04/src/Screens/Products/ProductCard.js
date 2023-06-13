import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Toast from 'react-native-toast-message'


//  REDUX
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
// import AuthGlobal from "../../Context/store/AuthGlobal"

import Icon from "react-native-vector-icons/FontAwesome"
import { TouchableOpacity } from 'react-native-gesture-handler';


var { width } = Dimensions.get("window")

const ProductCard = (props) => {


    console.log("props.cartItems", props.cartItems)
    
    const { tital, price, image } = props;
    console.log(props)
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: image ? image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png" }}
            />
            {/* {console.log("image", image)} */}
            <View style={styles.card} />
            <Text style={styles.title}>
                {tital.length > 15 ? tital.substring(0, 15 - 3)
                    + "..." : tital
                }
            </Text>
            <Text style={styles.price}>
                ${price}
            </Text>
            <View style={{ marginBottom: 60 }}>
                <TouchableOpacity>
                    <Icon
                        name='heart-o'
                        style={{ position: 'relative' }}
                        color={"green"}
                        size={30}
                        onPress={() => {
                            props.addItemToCart(props),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${tital} added to Wishlist`,
                                    text2: "Go to your Wishlist to see your Favorite Places"
                                })
                            // console.log("props in product card",props)
                        }}
                    />
                </TouchableOpacity>
                {/* <Button
                    color={'green'}
                    title='Add'

                /> */}
            </View>
        </View>
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
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}


const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white"

    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
});

export default connect(null, mapDispatchToProps)(ProductCard)