import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar, VStack, Text, HStack, Divider } from 'native-base';

var { width } = Dimensions.get("window")

const SearchedProducts = (props) => {
    const { productsFiltered } = props;
    return (
        <ScrollView style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (<TouchableOpacity
                    onPress={() => {
                    props.navigation.navigate("ProductDetails", { item: item })
                    console.log("props in SearchedProducts=>", item)
                    }}
                    key={item._id.$oid}
                    >
                    <VStack space={3} divider={<Divider />} w="90%" >
                        <HStack justifyContent="space-between"  avatar
                        >
                            <Avatar size="lg" style={{ width: "20%" }} source={{
                                uri: item.image ?
                                    item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                            }} />
                            <View style={{ width: "80%", paddingLeft: 20, paddingBottom: 20, }}>
                                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                <Text>{item.description}</Text>
                            </View>
                        </HStack>
                    </VStack>
                </TouchableOpacity>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})

export default SearchedProducts;