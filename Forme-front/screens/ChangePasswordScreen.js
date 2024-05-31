import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView, Alert, StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { jwtDecode } from "jwt-decode";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, configPassword] = useState('');
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState(''); // State to store user ID

  let [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
  });
  if (!fontsLoaded) {
    return <StatusBar />;
  }

  // id 출력을 위한 로직
  useEffect(() => {
    const getId = async () => {
      try {
        const AccessToken = await AsyncStorage.getItem('accessToken');
        const decodedToken = jwtDecode(AccessToken);
        console.log(decodedToken);
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error('Err', error);
      }
    };
    getId();
  }, []);

  const handleChangePassword = async() => {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    // 비밀번호 확인 로직
    if (newPassword !== confirmPassword) {
      Alert.alert('에러 발생', '비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      console.log('Sending request with:', { oldPassword, newPassword });
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      const response = await axios.post('http://192.168.0.6:8080/api/mypage/password', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken
        }
      });

      // 비밀번호 변경 완료시 로그아웃
      if (response.status === 200) {
        Alert.alert('변경 완료', '비밀번호가 변경되었습니다. 다시 로그인해주세요.', [
          { text: '확인', onPress: handleLogout }
        ]);
      } else {
        console.log('error', response);
      }
    } catch (err) {
      console.error('Network error:', err);
      Alert.alert('네트워크 오류', '네트워크 연결에 문제가 있습니다. 다시 시도해주세요.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('로그아웃 도중 문제가 발생했습니다.', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <View style={styles.logoContainer}>
        <Text style={styles.MainLogo}>For Me</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper1}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput
            value={userId}
            style={styles.input}
            width='80%'
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
            editable={false} //수정 불가
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper2}>
          <Image source={require('../assets/lock.png')} style={styles.icon} />
          <TextInput
            placeholder="기존 비밀번호"
            onChangeText={text => configPassword(text)}
            value={oldPassword}
            style={styles.input}
            width='80%'
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper2}>
          <Image source={require('../assets/lock.png')} style={styles.icon} />
          <TextInput
            placeholder="신규 비밀번호"
            onChangeText={text => setPassword(text)}
            value={newPassword}
            style={styles.input}
            width='80%'
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper3}>
          <Image source={require('../assets/check.png')} style={styles.icon} />
          <TextInput
            placeholder="신규 비밀번호 확인"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            style={styles.input}
            width='80%'
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.changeContainer}>
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>비밀번호 변경</Text>
            </TouchableOpacity>
      </View>
  
      <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Service')}>
                <Text style={styles.MainButtonText}>고객센터</Text>
            </TouchableOpacity>
            <Text style={styles.LogoText}>For Me</Text>
        </View>
    </KeyboardAvoidingView>
  );
};

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
  },
  inputWrapper3: {
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
    marginLeft:     10,
  },
  changeContainer: {
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
});

export default ChangePasswordScreen;