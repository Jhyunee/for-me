import { Button, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="아이디"
                value={id}
                onChangeText={text => setId(text)}
                style={styles.input} 
            />
            <TextInput 
                placeholder="비밀번호"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input} 
            />
        </View>
        <View style={styles.buttonContainer}>
            <View style={styles.loginContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Text style={[styles.linkText, styles.grayText]}>비밀번호 찾기</Text>
                </TouchableOpacity>
                { /* <Text style={styles.divider}> | </Text> */ }
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Text style={[styles.linkText, styles.grayText]}>아이디 찾기</Text>
                </TouchableOpacity>
                 { /* <Text style={styles.divider}> | </Text> */ }
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Text style={[styles.linkText, styles.blueText]}>회원가입</Text>
                </TouchableOpacity>            
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text style={styles.MainButtonText}>고객센터</Text>
            </TouchableOpacity>
            </View>
                
        <Text style={styles.LogoText}>For Me</Text>
    </View>
  )
}
// 지금 로그인 - 고객센터 - 비밀번호~회원가입 - 로고 이렇게 됨 알아서,, ㅅ정해저ㅏ마로머ㅏ러ㅏ
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 15,
    },
    inputContainer: {
        width: '70%'
    },
    loginContainer: {
        width: '105%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#949494'
    },
    button: {
        backgroundColor: '#508BFF',
        width: '130%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: '900',
        fontSize: 14,
        color: 'white'
    },
    linkText:{
        fontSize: 12,
        marginRight: 10
    },
    grayText: {
        color: '#545454'
    },
    blueText: {
        color: '#508BFF'
    },
    divider: {
        color: '#545454',
        fontSize: 12,
        
    },
    MainButtonText: {
        fontWeight: '900',
        fontSize: 12,
        color: '#868E96',
        marginTop: 30,
        marginBottom: 8
    },
    LogoText: {
        fontWeight: '900',
        fontSize: 20,
        color: '#868E96',
        textAlign: 'center',
        fontStyle: 'italic'
    }
})