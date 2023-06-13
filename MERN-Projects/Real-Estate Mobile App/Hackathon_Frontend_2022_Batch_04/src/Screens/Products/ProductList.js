import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

import ProductCard from "./ProductCard"

var { width } = Dimensions.get("window")

const ProductList = (props) => {
    const { item ,navigation} = props;
    return (
        <TouchableOpacity 
        // style={{width: 50%}}
        onPress={()=>{
            props.navigation.navigate("ProductDetails", { item: item})
            
            // console.log("props in productList=>", item)
        }}
        >
            <View style={{
                width: width / 2,
                backgroundColor: 'gainsboro' 
            }}>
                <ProductCard {...item} />
            </View>

        </TouchableOpacity>
    )
}

// const styles = StyleSheet.create({
//   container: {
//       flex:1,
//       backgroundColor: "#ccc",
//       justifyContent:'center',
//       alignItems: "center"
//   },
// });

export default ProductList