import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native'

import Todo from "./Todo"

const TodoList = () => {

    const [title, setTitle] = useState("TodoList")
    const [text, setText] = useState("")

    const [list, setList] = useState(['Hello World'])


    //ADD ITEM METHOD
    const addItem = () => {
        const updatedList = list;
        updatedList.push(text);
        setText('')
    }


    //DELETE ITEM METHOD
    const deleteItem = (item) => {
        const updatedList = list.filter((todo) => todo !== item)
        setList(updatedList)
    }

    return (
        <View style={{ width: '80%', marginBottom: 60 }}>
            <Text style={[styles.align, styles.font]}>{title}</Text>
            <ScrollView>
                {
                    list.map((x, index) =>
                        <Todo key={index} item={x} index={index} delete={deleteItem}/>
                    )
                }
            </ScrollView>
            <View>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
                <Button title='Add item' onPress={addItem} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    align: {
        alignSelf: 'center'
    },
    font: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 8,
        padding: 8
    }
})


export default TodoList;