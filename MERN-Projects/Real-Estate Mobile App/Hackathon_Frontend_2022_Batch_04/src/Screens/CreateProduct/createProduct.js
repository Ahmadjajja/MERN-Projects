import React, { useRef, useState, useEffect, useContext } from 'react';
import { Box, Input, NativeBaseProvider, Image, Text, VStack, Select, CheckIcon, Button, FormControl, Stack, ScrollView, TextArea, Center, Heading } from 'native-base';
import { TouchableOpacity, FlatList, View, Dimensions, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import baseURL from "../../assets/common/baseUrl";
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import mime from "mime";
import Error from "../../Shared/Error"
//react-native image picker
import { launchImageLibrary } from 'react-native-image-picker';
var { width } = Dimensions.get("window")
import Toast from 'react-native-toast-message'

//
// context
import { ProductContext } from '../../Context/store/productGlobal.js';
import AuthGlobal from "../../Context/store/AuthGlobal"


export default function CreateProduct(props) {

    const {dataUpdationRender, setDataUpdationRender, productsGlobal, setProductsGlobal, productDataToUpdate, setProductDataToUpdate, categoriesGlobal, setCategoriesGlobal } = useContext(ProductContext);
    const context = useContext(AuthGlobal)
    // console.log(productDataToUpdate.finishType, "Abu hurairah");
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState('');
    const [image, setImage] = useState('');
    const [token, setToken] = useState();
    const [err, setErr] = useState();
    const [uploading, setUploading] = useState(false)
    const [uploadingMessage, setUploadingMessage] = useState("Uploading Image...")

    const [finishType, setFininshType] = useState('');
    const [reception, setReception] = useState()
    const [category, setCategory] = useState()
    const [categoryId, setCategoryId] = useState('')
    const [userData, setUserData] = useState('')
    const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('')
    const [categoryToBeUpdating, setCategoryToBeUpdating] = useState()
    const ref = useRef(null);

    const [product, setProduct] = useState({
        tital: "",
        location: "",
        noOfBedrooms: 0,
        noOfBathrooms: 0,
        livingRooms: 0,
        price: 0,
        area: 0,
        diningRooms: 0,
        kitchen: 0,
    })



    useEffect(() => {

        AsyncStorage.getItem("jwt") //token comes from asyncStorage
            .then((res) => {
                setToken(res)
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, //sub is number or the id in this case
                        {
                            headers: { Authorization: `Bearer ${res}` }
                        }
                    )
                    // console.log("token=>", res)
                    .then((user) => {
                        console.log("user.data =>", user.data.phone)
                        setUserData(user.data)
                        setOwnerPhoneNumber(user.data.phone)
                    })
            })
            .catch((error) => console.log(error));

        console.log("Token", token)

        // Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => {
                setCategories(res.data)
            })
            .catch((error) => alert("Error to load categories"));

        console.log("categories in createProducts folder", categories);




        return () => {
            setCategories([])
            setProduct({
                tital: "",
                location: "",
                noOfBedrooms: 0,
                noOfBathrooms: 0,
                livingRooms: 0,
                price: 0,
                area: 0,
                diningRooms: 0,
                kitchen: 0,
            })
            setFininshType('')
            setCategory()
            setImage('')
            setPhoto()
            setOwnerPhoneNumber('')
            setReception('')
            setCategoryId('')
        }
    }, [])

    useEffect(() => {
        //This logic uses for setting category-to-be-updating-name in state

        if (!(productDataToUpdate === undefined || productDataToUpdate === {} || productDataToUpdate === '')) {
            // setCategoryToBeUpdating()
            console.log("category function code working")


            const ct = categoriesGlobal.find((element) => {
                return (element.id === productDataToUpdate.category.id)
            })
            console.log("ct   ", ct.name)
            setCategoryToBeUpdating(ct.name);
            product.tital = productDataToUpdate.tital;
            product.location = productDataToUpdate.location;
            setFininshType(productDataToUpdate.finishType);
            product.noOfBedrooms = productDataToUpdate.noOfBedrooms.toString();
            product.noOfBathrooms = productDataToUpdate.noOfBathrooms.toString();
            product.livingRooms = productDataToUpdate.livingRooms.toString();
            setReception(productDataToUpdate.reception);
            setPhoto(productDataToUpdate.image);
            product.price = productDataToUpdate.price.toString();
            setCategory(ct.name);

            product.area = productDataToUpdate.area.toString();
            product.diningRooms = productDataToUpdate.diningRooms.toString();
            product.kitchen = productDataToUpdate.kitchen.toString();
        }
    }, [dataUpdationRender])



    const selectPhotoTapped = () => {
        const options = {    //it’s an object for customizing the image picker.
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {

            console.log('Response = ', response);
            console.log("response", response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;
                const source = {
                    uri,
                    type,
                    name,
                }
                cloudinaryUpload(source)
                console.log("Image source=>", source)

            }
        });
    }
    const cloudinaryUpload = (Photo) => {
        setUploading(true)
        const data = new FormData()
        data.append('file', Photo)
        data.append('upload_preset', 'jajja-group-of-company')
        data.append("cloud_name", "jajja-group-of-company")

        console.log("image uploading gonna start...")
        fetch("https://api.cloudinary.com/v1_1/jajja-group-of-company/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                console.log("data.secure_url", data.secure_url)
                setPhoto(data.secure_url)
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Image Uploaded Successfuly!",
                    text2: ""
                })
                setUploading(false)
            }).catch(err => {
                setPhoto(data.secure_url)
                setUploading(false)
                Toast.show({
                    topOffset: 60,
                    type: "Error",
                    text1: "An Error Occured While Uploading!",
                    text2: ""
                })
            })
    }

    const handleChange = (name, value) => {
        setProduct(s => ({ ...s, [name]: value }))
    }

    const handleSubmit = async () => {
        console.log("ownerPhoneNumber", ownerPhoneNumber)

        if (
            product.tital == "" ||
            product.location == "" ||
            product.noOfBedrooms == 0 ||
            product.noOfBathrooms == 0 ||
            product.price == 0 ||
            product.livingRooms == 0 ||
            product.area == 0 ||
            product.diningRooms == 0 ||
            product.kitchen == 0 ||
            photo == '' ||
            category == '' ||
            reception == undefined ||
            finishType == ''
        ) {
            setErr("Please fill in the form correctly")
        } else {
            setErr('')
            console.log("category ", category)
            console.log("categories gonna looping and find specific", categories)
            categories.forEach((item) => {
                console.log(item.name)
                console.log(category)
                if (item.name === category) {
                    console.log("ID of category => ", item.id, item.name)
                    setCategoryId(item.id)
                }
            })





            let productData = {
                tital: product.tital,
                location: product.location,
                finishType: finishType,
                noOfBedrooms: Number(product.noOfBedrooms),
                noOfBathrooms: Number(product.noOfBathrooms),
                livingRooms: Number(product.livingRooms),
                reception: reception,
                image: photo,
                images: [],
                price: Number(product.price),
                category: categoryId,
                area: Number(product.area),
                diningRooms: Number(product.diningRooms),
                kitchen: Number(product.kitchen),
                ownerPhoneNumber: ownerPhoneNumber,
            }

            console.log("productData  =>", productData);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            console.log("config=> ", config)
            console.log("gonna start posting")
            axios
                .post(`${baseURL}products`, productData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        console.log("post data successfull")
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Product added",
                            text2: ""
                        })


                        //logic for rendering added product at homepage without refreshing here
                        productData.id = Date.now() + Date.now()
                        productData._id = productData.id

                        console.log("productData after adding id and _id", productData)
                        setProductsGlobal(productsGlobal.concat(productData))
                        console.log("products global + product Data", productsGlobal.concat(productData))

                        setCategories([])
                        setProduct({
                            tital: "",
                            location: "",
                            noOfBedrooms: 0,
                            noOfBathrooms: 0,
                            livingRooms: 0,
                            price: 0,
                            area: 0,
                            diningRooms: 0,
                            kitchen: 0,
                        })
                        setFininshType('')
                        setCategory('')
                        setImage('')
                        setPhoto('')
                        setOwnerPhoneNumber('')
                        setReception('')
                        setCategoryId('')

                        setTimeout(() => {
                            props.navigation.navigate("home");
                        }, 500)

                    }
                })
                .catch((error) => {
                    console.log("Error Occured While Posting", error)
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "please try again"
                    })
                })
        }
    }

    const updateHandler = () => {
        // console.log("ownerPhoneNumber", ownerPhoneNumber)

        if (
            product.tital == "" ||
            product.location == "" ||
            product.noOfBedrooms == 0 ||
            product.noOfBathrooms == 0 ||
            product.price == 0 ||
            product.livingRooms == 0 ||
            product.area == 0 ||
            product.diningRooms == 0 ||
            product.kitchen == 0 ||
            photo == '' ||
            category == '' ||
            reception == undefined ||
            finishType == ''
        ) {
            setErr("Please fill in the form correctly")
        } else {
            setErr('')
            console.log("category ", category)
            console.log("categories gonna looping and find specific", categories)
            categories.forEach((item) => {
                // console.log(item.name.toLowerCase())
                // console.log(category.toLowerCase())
                if (item.name === category) {
                    console.log("ID of category => ", item.id, item.name)
                    setCategoryId(item.id)
                }
            })








            let productData = {
                tital: product.tital,
                location: product.location,
                finishType: finishType,
                noOfBedrooms: Number(product.noOfBedrooms),
                noOfBathrooms: Number(product.noOfBathrooms),
                livingRooms: Number(product.livingRooms),
                reception: reception,
                image: photo,
                images: [],
                price: Number(product.price),
                category: categoryId,
                area: Number(product.area),
                diningRooms: Number(product.diningRooms),
                kitchen: Number(product.kitchen),
                ownerPhoneNumber: ownerPhoneNumber,
            }

            console.log("productDataToUpdate.id", productDataToUpdate.id)
            console.log("productDataToUpdate", productDataToUpdate)
            console.log("Updating Product data", productData)

            // setProductDataToUpdate()


            // console.log("productData  =>", productData);

            // console.log("productData after adding id =>", productData);


            // console.log("productGlobal", productsGlobal)
            // console.log("filteredProductData", filteredProductData) 




            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            console.log("config=> ", config)
            console.log("gonna start updating")
            axios
                .put(`${baseURL}products/${productDataToUpdate.id}`, productData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        console.log("update data successfull")
                        setTimeout(() => {
                            props.navigation.navigate("Home");
                        }, 100)
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Product updated successfuly!",
                            text2: ""
                        })

                        productData.id = productDataToUpdate.id;
                        productData._id = productDataToUpdate._id;

                        //main logic for updating data
                        const filteredProductData = productsGlobal.map((element) => {
                            return element.id != productDataToUpdate.id ? element : productData;
                        })

                        setProductsGlobal(filteredProductData)
                        

                        setProductDataToUpdate()

                        setCategories([])
                        setProduct({
                            tital: "",
                            location: "",
                            noOfBedrooms: 0,
                            noOfBathrooms: 0,
                            livingRooms: 0,
                            price: 0,
                            area: 0,
                            diningRooms: 0,
                            kitchen: 0,
                        })
                        setFininshType('')
                        setCategory()
                        setImage('')
                        setPhoto('')
                        setOwnerPhoneNumber('')
                        setReception('')
                        setCategoryId('')

                    }
                })
                .catch((error) => {
                    console.log("Error Occured While Updating", error)
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "please try again"
                    })
                })
        }
    }


    return (
        <NativeBaseProvider>
            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                marginTop: 30
            }}>
                <ScrollView>
                    <FormControl isRequired>


                        <>

                            <Heading style={{ alignSelf: "center" }}>Add Product</Heading>
                            <Box style={styles.imageContainer}>
                                {!uploading ?
                                    <><Image source={{ uri: photo }} alt="Product Image" style={styles.image}></Image></> :
                                    <><Text>{uploadingMessage}</Text></>
                                }

                                <TouchableOpacity style={styles.imagePicker} onPress={selectPhotoTapped}>
                                    <Icon name="camera" color="white" />
                                </TouchableOpacity>
                            </Box>
                            <Box flexDirection="column">
                                <Stack w="100%" >
                                    <FormControl.Label>Title</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Product Title"
                                        isRequired
                                        onChangeText={(value) => handleChange("tital", value)}
                                        value={product.tital}
                                    />
                                </Stack>
                                <VStack w="100%">
                                    <FormControl.Label>Finish Type</FormControl.Label>
                                    <Select shadow={2}
                                        minWidth="180px" accessibilityLabel="Choose Category"
                                        placeholder="Choose Finish Type" _selectedItem={{
                                            bg: 'teal.600',
                                            endIcon: <CheckIcon size="5" />
                                        }} _light={{
                                            bg: 'coolGray.100'
                                        }} _dark={{
                                            bg: 'coolGray.800'
                                        }}
                                        onValueChange={itemValue => setFininshType(itemValue)}
                                    // onChangeText={(value) => handleChange("finishType", value)}
                                        selectedValue={finishType}
                                    >
                                        <Select.Item shadow={2} label="Furnished" value="Furnished" />
                                        <Select.Item shadow={2} label=" Finished with ACs & Kitchen" value=" Finished with ACs & Kitchen" />
                                        <Select.Item shadow={2} label=" Finished without ACs" value=" Finished without ACs" />
                                    </Select>
                                </VStack>
                            </Box>
                            <Box flexDirection="column">
                                <Stack w="100%" >
                                    <FormControl.Label>Bedrooms</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Bedrooms"
                                        onChangeText={(value) => handleChange("noOfBedrooms", value)}
                                        value={product.noOfBedrooms}
                                        keyboardType="numeric"
                                    />
                                </Stack>
                                <Stack w="100%" >
                                    <FormControl.Label>Bathrooms</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Bathrooms"
                                        keyboardType="numeric"
                                        onChangeText={(value) => handleChange("noOfBathrooms", value)}
                                        value={product.noOfBathrooms} />
                                </Stack>
                            </Box>
                            <Box flexDirection="column">
                                <Stack w="100%" >
                                    <FormControl.Label>Area</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Area"
                                        onChangeText={(value) => handleChange("area", value)}
                                        value={product.area}
                                        keyboardType="numeric"
                                    />
                                </Stack>
                                <Stack w="100%" >
                                    <FormControl.Label>Dining Rooms</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Bathrooms"
                                        onChangeText={(value) => handleChange("diningRooms", value)}
                                        value={product.diningRooms}
                                        keyboardType="numeric"
                                    />
                                </Stack>
                            </Box>
                            <Box flexDirection="column">
                                <Stack w="100%">
                                    <FormControl.Label>Living Rooms</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Living Rooms"
                                        onChangeText={(value) => handleChange("livingRooms", value)}
                                        value={product.livingRooms}
                                        keyboardType="numeric"
                                    />
                                </Stack>
                                <VStack w="100%">
                                    <FormControl.Label>Reception</FormControl.Label>
                                    <Select shadow={2}
                                        minWidth="180px" accessibilityLabel="Choose Reception"
                                        placeholder="Choose Reception" _selectedItem={{
                                            bg: 'teal.600',
                                            endIcon: <CheckIcon size="5" />
                                        }} _light={{
                                            bg: 'coolGray.100'
                                        }} _dark={{
                                            bg: 'coolGray.800'
                                        }}
                                        onValueChange={itemValue => setReception(itemValue)}

                                    // onChangeText={(value) => handleChange("reception", value)}
                                    selectedValue={reception}
                                    >
                                        <Select.Item shadow={2} label="Yes" value="Yes" />
                                        <Select.Item shadow={2} label="NO" value="NO" />
                                    </Select>
                                </VStack>
                            </Box>
                            <Box flexDirection="column">
                                <Stack w="100%">
                                    <FormControl.Label>Price</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Price"
                                        onChangeText={(value) => handleChange("price", value)}
                                        value={product.price}
                                        keyboardType="numeric"
                                    />
                                </Stack>
                                <VStack w="100%">
                                    <FormControl.Label>Category</FormControl.Label>
                                    <Select shadow={2}
                                        minWidth="180px" accessibilityLabel="Choose Category"
                                        placeholder="Choose Category" _selectedItem={{
                                            bg: 'teal.600',
                                            endIcon: <CheckIcon size="5" />
                                        }} _light={{
                                            bg: 'coolGray.100'
                                        }} _dark={{
                                            bg: 'coolGray.800'
                                        }}

                                        onValueChange={itemValue => setCategory(itemValue)}

                                    // onChangeText={(value) => handleChange("category", value)}
                                        selectedValue={category}
                                    >
                                        <Select.Item shadow={2} label="Apartment" value="Apartment" />
                                        <Select.Item shadow={2} label="Villa" value="Villa" />
                                        <Select.Item shadow={2} label="Studio" value="Studio" />
                                        <Select.Item shadow={2} label="Challet" value="Challet" />
                                        <Select.Item shadow={2} label="Twinhouse" value="Townhouse" />
                                    </Select>
                                </VStack>
                            </Box>
                            <Box flexDirection="row" justifyContent={"center"}>
                                <Stack w="100%" >
                                    <FormControl.Label>kitchen</FormControl.Label>
                                    <Input _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }} _hover={{
                                        bg: 'coolWhite.200'
                                    }} shadow={2} placeholder="Kitchen"
                                        onChangeText={(value) => handleChange("kitchen", value)}
                                        value={product.kitchen}
                                        keyboardType="numeric"
                                    />
                                </Stack>
                            </Box>
                            <Box w="100%" marginTop="2" style={{ marginBottom: 5 }}>
                                <FormControl.Label style={{ paddingRight: 175 }}>Location</FormControl.Label>
                                <TextArea h={20} placeholder="Location Here" w="100%"
                                    onChangeText={(value) => handleChange("location", value)}
                                    value={product.location}
                                />
                            </Box>
                            {err ? <Error style={{ paddingBottom: 10 }} message={err} /> : null}
                        </>

                        {productDataToUpdate === undefined || productDataToUpdate === {} || productDataToUpdate === '' ?
                            <Box style={{ marginVertical: 5 }}>
                                <Button onPress={handleSubmit}>Add Product</Button>
                            </Box>
                            :
                            <Box style={{ marginVertical: 5 }}>
                                <Button onPress={updateHandler}>Update Product</Button>
                            </Box>
                        }

                    </FormControl>
                </ScrollView>
            </View>
        </NativeBaseProvider >
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10,
        marginLeft: 60,
        marginVertical: 10,
        backgroundColor: 'white'
    }, image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20, //what does elevation
    }
})