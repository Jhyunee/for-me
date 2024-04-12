import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
    const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'default'}/>
        <Text style={styles.pageTitle}>For Me</Text>
        <Button title="로그인 화면" onPress={() => navigation.navigate('Home')} />
        <View style={styles.separator} />
        <View style={styles.listView}>
            <Text style={styles.listTitle}>매일 신청 체크리스트</Text>
        </View>
        <View style={styles.listView}>
            <Text style={styles.listTitle}>건강</Text>
        </View>
        <View style={styles.listView}>
            <Text style={styles.listTitle}>완료됨</Text>
        </View>
        <View style={styles.menuBar} />
    </SafeAreaView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa'
    },
    pageTitle: {
        marginTop: 20,
        marginBottom: 5,
        paddingHorizontal: 15,
        fontSize: 35,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#508BFF',
        textAlign: 'center'
    },
    separator: {
        marginHorizontal: 100,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    listView: {
        flex: 1
    },
    listTitle: {
        marginBottom: 25,
        paddingHorizontal: 15,
        fontSize: 14,
        fontWeight: 'bold',
        flex: 0
    },
    menuBar: {
        height: 60,
        backgroundColor: '#508BFF'
    }

})
