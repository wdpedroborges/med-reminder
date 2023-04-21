import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function AddItem({ title, addItem }) {
  const [text, setText] = useState('')
  const inputRef = useRef('')

  const handleChangeText = (textValue) => {
    setText(textValue)
  }

  return (
    <View style={styles.header}>
      <TextInput onChangeText={handleChangeText} ref={inputRef} placeholder="Add Item..." style={styles.input}/>
      <TouchableOpacity onPress={() => {
        inputRef.current.clear()
        addItem(text)
      }}>
        <Text style={styles.btn}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16
  },
  btn: {
    backgroundColor: 'teal',
    color: '#fff',
    padding: 10,
    fontSize: 20,
    textAlign: 'center'
  }
})
