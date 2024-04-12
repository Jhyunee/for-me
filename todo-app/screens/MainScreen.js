import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'default'} />
        <Text>ToDo App</Text>
        <View>
            <Text>할 일</Text>
        </View>
        <View />
        <View>
            <Text>완료된 일</Text>
        </View>
    </SafeAreaView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa'
    }
})