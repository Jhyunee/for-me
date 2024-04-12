import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TodoItem = () => {
  return (
    <View style={styles.itemContainer}>
        <Pressable 
            style={styles.itemCheckbox}
        >

      </Pressable>
    </View>
  )
}

export default TodoItem

const styles = StyleSheet.create({})