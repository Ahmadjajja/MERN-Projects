import React from 'react';
import {Modal, Text, Pressable, View, TextInput} from 'react-native';
import Button from '../button/Button';
import {styles} from './InputModalStyle';
import useInputModal from './useInputModal';

const InputModal = props => {
  const {
    modalAppear,
    setModalAppear,
    setTodoInput,
    isUpdate,
    setIsUpdate,
    todoInput,
    updateKey,
  } = props;
  const {onSubmitHandler} = useInputModal();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAppear}
        onRequestClose={() => {
          setModalAppear(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                &#9997;&#127995; Add Todo
              </Text>
            </View>

            <TextInput
              style={styles.inputField}
              onChangeText={setTodoInput}
              value={todoInput}
              placeholder="&#9997; Enter Todo"
            />
            <View style={styles.todoModalButtons}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  setModalAppear(false);
                  setTodoInput('');
                  setIsUpdate(false);
                }}>
                <Button iconName="close" iconColor="#0d3b66" />
              </Pressable>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  setTodoInput(todoInput);
                  onSubmitHandler(todoInput, isUpdate, setIsUpdate, updateKey);
                  setModalAppear(false);

                  setTodoInput('');
                }}>
                <Button iconName="check" iconColor="#0d3b66" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InputModal;
