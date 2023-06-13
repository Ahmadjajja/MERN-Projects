import {
  ADD_TODO,
  DELETE_ALL,
  DELETE_TODO,
  UPDATE_TODO,
} from '../types/constants';
export const addTodo = data => {
  return {
    type: ADD_TODO,
    payload: data,
  };
};
export const deleteAll = () => {
  return {
    type: DELETE_ALL,
  };
};
export const deleteTodo = data => {
  return {
    type: DELETE_TODO,
    payload: data,
  };
};
export const updateTodo = data => {
  return {
    type: UPDATE_TODO,
    payload: data,
  };
};
