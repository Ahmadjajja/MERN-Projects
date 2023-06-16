import { Image, View, StyleSheet, Text, ScrollView, Button, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

import { Left, Right, Container, Heading, HStack } from "native-base"
import Toast from 'react-native-toast-message'

//  REDUX
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'

var { height } = Dimensions.get('window')

const SingleProducts = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');
    // console.log("from single product",props.route.params.item)

    return (
        <View style={styles.Container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ?
                                item.image :
                                "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                        }}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Heading style={styles.contentHeader}>{item.name}</Heading>
                    <Heading style={styles.contentText} size="md">{item.brand}</Heading>
                </View>
            </ScrollView>
            {/* <View > */}
            <HStack style={styles.bottomContainer}>
                <Text style={styles.price}>$ {item.price}</Text>
                <Button
                    style={styles.AddButton}
                    title='Add'
                    onPress={() => {
                        props.addItemToCart(props.route.params.item),
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${item.name} added to Cart`, 
                            text2: "Go to your cart to complete order  "
                        })
                        // console.log("props in Single Product",props.route.params.item)
                    }}
                />
            </HStack>

            {/* </View> */}
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
    Container: {
        position: 'relative',
        height: '100%',
        backgroundColor: "white"
    },
    // imageContainer: {
    //     backgroundColor: 'white',
    //     padding: 0,
    //     margin: 0
    // },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        // alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        color: 'red',
    }, AddButton: {
        // marginRight: 10
    }
    // availabilityContainer: {
    //     marginBottom: 20,
    //     alignItems: "center"
    // },
    // availability: {
    //     flexDirection: 'row',
    //     marginBottom: 10,
    // }
})


export default connect(null, mapDispatchToProps)(SingleProducts)