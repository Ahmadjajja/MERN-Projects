/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
export const style = StyleSheet.create({
  container: {
    backgroundColor: '#0d3b66',
    flex: 1,
  },
  child1: {
    flex: 2,
  },
  headerContainer: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  todoButtonContainer: {
    fontSize: 25,
  },
  todoModalContainer: {
    flex: 1,
    borderRadius: 15,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  todoListContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  footerContainer: {justifySelf: 'flex-end'},
});
