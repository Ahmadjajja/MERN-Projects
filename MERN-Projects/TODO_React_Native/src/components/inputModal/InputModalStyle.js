import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '75%',
    backgroundColor: '#faf0ca',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },

  modalHeaderText: {
    color: '#0d3b66',
    fontSize: 25,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    fontSize: 18,
    width: '100%',
    borderRadius: 20,
    borderColor: '#0d3b66',
    borderWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  todoModalButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
  },
});
