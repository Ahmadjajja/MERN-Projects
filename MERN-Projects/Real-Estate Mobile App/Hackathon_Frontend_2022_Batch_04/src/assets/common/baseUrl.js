/* eslint-disable prettier/prettier */
import { Platform } from 'react-native'

// let baseURL = 'https://real-estate-server786.herokuapp.com/api/v1/'

let baseURL = '';

{Platform.OS != 'android'
? baseURL = 'http://65.49.68.23:3000/api/v1/'   //Before :3000 is our localhost
: baseURL = 'http://localhost:3000/api/v1/'
}

export default baseURL; 
