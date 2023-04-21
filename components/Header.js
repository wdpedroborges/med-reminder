import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'

export default function Header({ title }) {

  return (
    <View style={styles.header}>
      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
  },
})
