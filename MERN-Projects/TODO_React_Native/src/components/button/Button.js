/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {style} from './ButtonStyle';

const Button = props => {
  const {iconName, iconColor} = props;
  return (
    <View style={style.container}>
      <Icon name={iconName} color={iconColor} size={50} />
    </View>
  );
};

export default Button;
