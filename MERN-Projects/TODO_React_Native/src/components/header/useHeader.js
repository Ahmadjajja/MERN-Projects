import {useDispatch} from 'react-redux';
import {deleteAll} from '../../store/actions/todoAction';

const useHeader = () => {
  const dispatch = useDispatch();
  const onDeleteAllHandler = () => {
    dispatch(deleteAll());
  };
  return {onDeleteAllHandler};
};

export default useHeader;
