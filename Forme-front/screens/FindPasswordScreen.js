import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView, Alert, StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Hoshi } from 'react-native-textinput-effects';

const FindPasswordScreen = () => {
    const navigation = useNavigation();
    const [userId, setId] = useState('');
    const [email, setemail] = useState('');
    let [fontsLoaded] = useFonts({
        'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
        'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
        'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
    });
    if (!fontsLoaded) {
        return <StatusBar />;
    }

    // const handleLogin = async () => {
    //     const data = {
    //         userId: userId,
    //         email: email
    //     };
    //     try {
    //         // console.log('Sending request with:', { userId, password });
    //         const response = await axios.post('http://172.16.11.224:8080/login', data);
    //         // console.log('Received response:', response.data);

    //         // 로그인 성공
    //         if (response.status === 200) {
    //             const AccessToken = response.headers.get("Authorization").replace('Bearer ', '');
    //             const RefreshToken = response.headers["refresh-token"];
                
    //             // AsyncStorage에 액세스 토큰, 리프레시 토큰 저장 -> 지속적 보관
    //             await AsyncStorage.setItem('accessToken', AccessToken);
    //             await AsyncStorage.setItem('refreshToken', RefreshToken);
                
    //             // 토큰 디코드 필요시 사용 코드
    //             // const decodedToken = jwtDecode(AccessToken);
    //             // console.log(decodedToken);

    //             // 체크리스트 페이지 완성되면 체크리스트 페이지로 변경 필요
    //             navigation.navigate('MyPage');
    //         } else {
    //             // 인증 실패 또는 기타 오류
    //             let errorMessage = '알 수 없는 오류가 발생했습니다.';
    //             if (response.status === 401) {
    //                 errorMessage = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
    //             } else if (response.status === 500) {
    //                 errorMessage = '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.';
    //             }
    //             Alert.alert('Error', errorMessage);
    //         }
    //     } catch (error) {
    //         let errorMessage = '알 수 없는 오류가 발생했습니다.';
    //         if (error.response) {
    //             // 서버가 응답을 반환한 경우
    //             const { status, data } = error.response;
    //             if (status === 400) {
    //                 errorMessage = '입력한 정보를 확인해주세요.';
    //             } else if (status === 404) {
    //                 errorMessage = '서버를 찾을 수 없습니다.';
    //             } else {
    //                 errorMessage = `알 수 없는 오류가 발생했습니다: ${data.message}`;
    //             }
    //         } else if (error.request) {
    //             // 서버가 응답을 반환하지 않은 경우
    //             errorMessage = '서버에서 응답이 없습니다. 인터넷 연결을 확인해주세요.';
    //         } else {
    //             // 요청 설정 중 오류가 발생한 경우
    //             errorMessage = `요청 중 오류가 발생했습니다: ${error.message}`;
    //         }
    //         Alert.alert('Error', errorMessage);
    //     }
    // };
    
    return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View style={styles.logoContainer}>
            <Text style={styles.MainLogo}>
                For Me
            </Text>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper1}>
                <Image source={require('../assets/user.png')} style={styles.icon}/>
                <TextInput 
                    placeholder="아이디"
                    onChangeText={ text => setId(text)}
                    value={userId}
                    style={styles.input} 
                    width='80%'
                    placeholderTextColor="#D1D1D1"
                    placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
                />
            </View>
            <View style={styles.inputDivider} />
            <View style={styles.inputWrapper2}>
                <Image source={require('../assets/mail.png')} style={styles.icon}/>
                <TextInput 
                    placeholder="이메일"
                    onChangeText={ text => setemail(text)}
                    value={email}
                    style={styles.input}
                    width='80%'
                    placeholderTextColor="#D1D1D1"
                    placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
                />
            </View>
        </View>
        <View style={styles.loginContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>비밀번호 찾기</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
                    <Text style={[styles.linkText, styles.grayText]}>아이디 찾기</Text>
                </TouchableOpacity>
                    {  <Text style={styles.divider}> | </Text>  }
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.linkText, styles.blueText]}>회원가입</Text>
                </TouchableOpacity>            
        </View>
        <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Service')}>
                <Text style={styles.MainButtonText}>고객센터</Text>
            </TouchableOpacity>
            <Text style={styles.LogoText}>For Me</Text>
        </View>
    </KeyboardAvoidingView>
  )
}

export default FindPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: '20%'
    },
    MainLogo: {
        color: '#508bff',
        fontFamily: 'Inter-ExtraBoldItalic',
        fontSize: 40,
        textAlign: 'center'
      },
    inputContainer: {
        width: '70%'
    },
    inputWrapper1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    inputDivider: {
        backgroundColor: '#AAAAAA',
        height: 1,
        width: '100%',
    },
    inputWrapper2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    input: {
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
        marginLeft: 10,
    },
    loginContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#508BFF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        height: 50
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Pretendard-Bold',
    },
    linkContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    linkText:{
        fontSize: 12,
        marginHorizontal: 3,
        fontFamily: 'Pretendard-Regular'
    },
    grayText: {
        color: '#D1D1D1'
    },
    blueText: {
        color: '#508BFF'
    },
    divider: {
        color: '#D1D1D1',
        fontSize: 12,
        
    },
    bottomContainer: {
        position: 'absolute',
        bottom: '5%',
        width: '100%',
    },
    MainButtonText: {
        fontSize: 12,
        color: '#D1D1D1',
        marginTop: 30,
        fontFamily: 'Pretendard-Bold',
        textAlign: 'center'
    },
    LogoText: {
        fontSize: 20,
        color: '#D1D1D1',
        textAlign: 'center',
        fontFamily: 'Inter-ExtraBoldItalic',
    }
})