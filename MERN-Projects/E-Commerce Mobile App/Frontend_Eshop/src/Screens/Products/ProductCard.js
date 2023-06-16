import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import Toast from 'react-native-toast-message'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'


var { width } = Dimensions.get("window")

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;
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
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + "..." : name
                }
            </Text>
            <Text style={styles.price}>
                ${price}
            </Text>
            {countInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <Button
                        color={'green'}
                        title='Add'
                        onPress={() => {
                            props.addItemToCart(props),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${name} added to Cart`,
                                text2: "Go to your cart to complete order"
                            })
                            // console.log("props in product card",props)
                        }}
                    />
                </View>
            ) : <Text style={{ marginTop: 100 }}>Currently Unavailable</Text>}
        </View>
    )
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