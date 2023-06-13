import {StyleSheet} from 'react-native';
export const style = StyleSheet.create({
  container: {
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {width: '50%'},
  headerText: {
    color: '#faf0ca',
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: '900',
    padding: 5,
    paddingLeft: 10,
  },
  iconContainer: {
    width: 55,
  },
});
