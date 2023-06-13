import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo} from '../../store/actions/todoAction';
const useTodoList = () => {
  const todos = useSelector(store => store.todoReducer.todos);
  const dispatch = useDispatch();
  const onDeleteHandler = uid => {
    dispatch(deleteTodo(uid));
  };
  return {
    todos,
    onDeleteHandler,
  };
};

export default useTodoList;
