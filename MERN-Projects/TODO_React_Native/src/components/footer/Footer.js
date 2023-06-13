import React from 'react';
import {View, Text} from 'react-native';

const Footer = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#023047',
          height: 45,
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#8ecae6',
            textAlign: 'center',
            marginTop: 0,
            paddingTop: 0,
          }}>
          Created by&nbsp;&nbsp;
          <Text
            style={{
              textDecorationLine: 'underline',
            }}>
            Abu Hurairah
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Footer;
