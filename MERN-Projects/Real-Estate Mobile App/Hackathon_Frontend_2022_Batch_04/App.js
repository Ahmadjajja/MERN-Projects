import { LogBox, View } from 'react-native'
import React from 'react'
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'
import Toast from "react-native-toast-message"
//Navigators
import Main from './src/Navigators/Main'

//Redux
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

//Context API
import Auth from './src/Context/store/Auth';
import ProductContextProvider from './src/Context/store/productGlobal';

//screens
import ProductContainer from './src/Screens/Products/ProductContainer'
import Header from "./src/Shared/Header"

const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <ProductContextProvider>
      <Auth>
        <Provider store={store}>
          <NativeBaseProvider >
            <NavigationContainer >
              <Header />
              <Main />
              <Toast />
              {/* <Toast ref={(ref) => setRef(ref)} /> */}
            </NavigationContainer>
          </NativeBaseProvider>
        </Provider>
      </ Auth>
    </ProductContextProvider>
  )
}

export default App
