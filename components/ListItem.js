import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function ListItem({ item, deleteItem }) {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.text}</Text>
        <Text onPress={() => deleteItem(item.id)} style={styles.done}>DONE</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    fontSize: 18
  },
  done: {
    color: 'brown',
    fontWeight: 'bold'
  }
})
