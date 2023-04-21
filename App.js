import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import Header from './components/Header'
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'
import * as Notifications from 'expo-notifications'

const genUniqueKey = () => {
  const date = new Date()

  let complement = ''
  for (let i = 0; i < 7; i++) {
    complement += Math.random()
  }

  return date.getTime() + complement
}

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      // user denied permission or there was an error
      return;
    }
  }
}

const showAlert = () =>
  Alert.alert(
    'Well done!',
    'You took all your medicines.',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Please, come back tomorrow.'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'Bye bye.',
        ),
    },
  );

let deletedAmount = 0

export default function App() {
  registerForPushNotificationsAsync()
  const [items, setItems] = useState([
    {id: genUniqueKey(), text: 'Omeprazole - 5:21'},
    {id: genUniqueKey(), text: 'Azithromycin - 9:00'},
    {id: genUniqueKey(), text: 'Metformin - 19:00'},
    {id: genUniqueKey(), text: 'Levothyroxine - 20:00'},
    {id: genUniqueKey(), text: 'Simvastatin - 21:00'}
  ])

  const handleNotification = (whatMedicine, when) => {
    const time = new Date()
    const hoursWhen = parseInt(when.split(':')[0])
    const minutesWhen = parseInt(when.split(':')[1])

    const currentHours = time.getHours()
    const currentMinutes = time.getMinutes()

    const difHours = (hoursWhen - currentHours) < 0 ? 0 : (hoursWhen - currentHours)
    const difMinutes = (minutesWhen - currentMinutes) < 0 ? 0 : (minutesWhen - currentMinutes)

    const hoursInSeconds = difHours * 60 * 60
    const minutesInSeconds = difMinutes * 60
    const everythingInSeconds = hoursInSeconds + minutesInSeconds

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hey, you need to take your medicine!',
        body: `${whatMedicine}`
      },
      trigger: {
        seconds: everythingInSeconds
      }
    })
  }

  useEffect(() => {
    for (let i = 0; i < items.length; i++) {
        const timeString = items[i].text.split(' - ')[1]
        const medicine = items[i].text.split(' - ')[0]
        handleNotification(medicine, timeString)
    }

    const intervalId = setInterval(() => {
      if (deletedAmount === items.length) {
        deletedAmount = 0
        showAlert()
        setItems([
          {id: genUniqueKey(), text: 'Omeprazole - 5:21'},
          {id: genUniqueKey(), text: 'Azithromycin - 9:00'},
          {id: genUniqueKey(), text: 'Metformin - 19:00'},
          {id: genUniqueKey(), text: 'Levothyroxine - 20:00'},
          {id: genUniqueKey(), text: 'Simvastatin - 21:00'}
       ])
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const deleteItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id)
    })

    deletedAmount++
  }

  const addItem = (text) => {

    handleNotification()
    if (text === '') {
      Alert.prompt('Alert Title', 'message', [
          {
              text: 'ok'          },
          {
              text: 'Cancel',
              style: 'cancel'
          },
      ])
    } else {
      setItems(prevItems => {
        return [{id: genUniqueKey(), text}, ...prevItems]
      })     
    }


  }

  return (
    <View style={styles.container}>
      <Header title="Med Reminder"/>
      <AddItem addItem={addItem}/>
      <FlatList data={items} renderItem={({item}) => (
        <ListItem item={item} deleteItem={deleteItem}/>
      )}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60
  }
})
