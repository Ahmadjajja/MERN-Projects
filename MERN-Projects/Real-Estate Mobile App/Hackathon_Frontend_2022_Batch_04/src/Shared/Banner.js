import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Swiper from "react-native-swiper/src"

var { width } = Dimensions.get('window')

const Banner = () => {
    const [bannerData, setBannerData] = useState([])

    useEffect(() => {
        setBannerData([
            "https://images.pexels.com/photos/210538/pexels-photo-210538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ])
        console.log(bannerData)
        return () => {
            setBannerData([])
        }
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain" //confusion
                                    source={{ uri: item }}
                                />
                                // console.log(item)
                            )
                        })

                        }
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro'
    }, swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    }, imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner