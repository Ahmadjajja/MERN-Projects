/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {style} from './HomeStyle';
import {TouchableOpacity, View} from 'react-native';
import Header from '../../components/header/Header';
import TodoList from '../../components/todoList/TodoList';
import InputModal from '../../components/inputModal/InputModal';
import Button from '../../components/button/Button';

const Home = () => {
  const [modalAppear, setModalAppear] = useState(false);
  const [todoInput, setTodoInput] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateKey, setUpdateKey] = useState({});

  return (
    <View style={style.container}>
      {!modalAppear ? (
        <View style={style.container}>
          <View style={style.headerContainer}>
            <Header />
          </View>
          <View style={style.todoListContainer}>
            <TodoList
              setModalAppear={setModalAppear}
              setTodoInput={setTodoInput}
              setIsUpdate={setIsUpdate}
              setUpdateKey={setUpdateKey}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => setModalAppear(!modalAppear)}>
              <Button
                iconName="add-circle"
                iconColor="#faf0ca"
                modalAppear={modalAppear}
                setModalAppear={setModalAppear}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={style.todoModalContainer}>
          <InputModal
            todoInpu={todoInput}
            setTodoInput={setTodoInput}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            modalAppear={modalAppear}
            setModalAppear={setModalAppear}
            updateKey={updateKey}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
