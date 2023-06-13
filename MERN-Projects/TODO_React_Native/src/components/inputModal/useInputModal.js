import {Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {addTodo, updateTodo} from './../../store/actions/todoAction';
const useInputModal = () => {
  const dispatch = useDispatch();
  const onSubmitHandler = (todoInput, isUpdate, setIsUpdate, updateKey) => {
    if (isUpdate) {
      let todo = {
        title: todoInput,
        key: updateKey,
      };
      dispatch(updateTodo(todo));
      setIsUpdate(false);
    } else {
      let todo = {
        title: todoInput,
        key: uuid.v4(),
      };
      dispatch(addTodo(todo));
    }
    if (!todoInput) {
      Alert.alert('Please! Fill the input field properly.');
    }
  };
  return {onSubmitHandler};
};

export default useInputModal;
