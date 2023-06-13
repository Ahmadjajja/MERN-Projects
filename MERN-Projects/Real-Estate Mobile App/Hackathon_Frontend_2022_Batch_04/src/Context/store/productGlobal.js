import React, { createContext, useState, useEffect, useContext } from 'react'      //diff b/w createContext and UseContext?
export const ProductContext = createContext();

import baseURL from "../../assets/common/baseUrl"
import axios from 'axios';


//Context Api
// import AuthGlobal from "./AuthGlobal"

function ProductContextProvider(props) {
  // const context = useContext(AuthGlobal)

//   const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoader, setIsLoader] = useState(true)
//   const [userId, setUserId] = useState('')
  const [productsGlobal, setProductsGlobal] = useState([]) 
  const [categoriesGlobal, setCategoriesGlobal] = useState([])
  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  const [productDataToUpdate,setProductDataToUpdate] = useState()
  const [dataUpdationRender, setDataUpdationRender] = useState(1)
  useEffect(() => {
    axios
    .get(`${baseURL}products`)
    .then((res) => {
    //   setProductsGlobal("res.data in productGlobal", res.data);
      setProductsGlobal(res.data)
      setIsLoader(false);
      // console.log("res.data in productGlobal", productsGlobal.length);

    })
    .catch((error) => {
      console.log("Api call error", error)
      setIsLoader(true); 
    })

    axios
    .get(`${baseURL}categories`)
    .then((res) => {
        // if(context.stateUser.isAuthenticated === true ){
        //   console.log("user is Authenticated")
        // }
        setCategoriesGlobal(res.data.reverse())
        console.log("res.data in categoriesGlobal=> " , categoriesGlobal)
        // const id= Date.now();
        // const ct= categoriesGlobal;
        // console.log("ct" , ct.push({id: id, _id: id, name: "My Posts"}))
        // setCategoriesGlobal()

      setIsLoader(false);
    })
    .catch((error) => {
      console.log("Api call error", error)
      setIsLoader(true);
    })
  }, [])

  return (
    <ProductContext.Provider value={{dataUpdationRender, setDataUpdationRender ,productDataToUpdate,setProductDataToUpdate, isLoader, setIsLoader, productsGlobal, setProductsGlobal, categoriesGlobal,  setCategoriesGlobal, userPhoneNumber, setUserPhoneNumber}}>
      {props.children}
    </ProductContext.Provider>
  )
}
export default ProductContextProvider