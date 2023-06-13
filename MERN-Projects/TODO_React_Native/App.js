/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import Home from './src/screens/home/Home';
import {Provider} from 'react-redux';
import store from './src/config/store';

const App = () => {
  return (
    <Provider store={store}>
      <View
        style={{
          flex: 1,
        }}>
        <Home />
      </View>
    </Provider>
  );
};

export default App;
