import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert, Platform, Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage"

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirthdate] = useState('');
  const [gender, setGender] = useState('f');
  const displayGenders = ['남자', '여자'];
  const genderValues = {
    '남자': 'm',
    '여자': 'f'
  };
  
  // 백엔드 형식으로 보내줄 형변환 된 자료
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return [match[1], match[2], match[3]].join('-');
    }
    return phoneNumber;
  };

  const formatDate = (date) => {
    const cleaned = ('' + date).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (match) {
      return [match[1], match[2], match[3]].join('-');
    }
    return date;
  }

  let [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
  });
  if (!fontsLoaded) {
    return <StatusBar />;
  }

  const handleUpdateProfile = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phone);
    const formattedBirthDate = formatDate(birth);
    const backendGender = genderValues[gender];

    const data = {
      password: password,
      name: name,
      phone: formattedPhoneNumber,
      email: email,
      birth: formattedBirthDate,
      gender: backendGender
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      console.log('Sending request with:', {name, formattedPhoneNumber, email, formattedBirthDate, backendGender});
      const response = await axios.patch('http://192.168.0.6:8080/api/mypage/auth', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken
        }
    });
      console.log('Received response:', response.data);

      if (response.status === 200) {
        Alert.alert('회원정보 수정 성공');
        navigation.navigate('MyPage');
      } else {
        console.log("에러발생")
      }
    } catch (error) {
        console.error('Error', error);
      }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <View style={styles.logoContainer}>
        <Text style={styles.MainLogo}>For Me</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper1}>
        <Image source={require('../assets/user.png')} style={styles.icon}/>
          <TextInput
            placeholder="이름"
            onChangeText={ text => setName(text)}
            value={name}
            style={styles.input}
            width='60%'
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper2}>
          <Image source={require('../assets/lock.png')} style={styles.icon} />
          <TextInput
          // 비밀번호도 업데이트 되는 거 맞아??
            placeholder="신규 비밀번호"
            onChangeText={text => setPassword(text)}
            value={password}
            style={styles.input}
            width='80%'
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper2}>
        <Image source={require('../assets/call.png')} style={styles.icon}/>
          <TextInput
            placeholder="연락처"
            onChangeText={ text => setPhoneNumber(text)}
            value={phone}
            style={styles.input}
            width='60%'
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper2}>
        <Image source={require('../assets/mail.png')} style={styles.icon}/>
          <TextInput
            placeholder="이메일"
            onChangeText={ text => setEmail(text)}
            value={email}
            style={styles.input}
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper2}>
        <Image source={require('../assets/calendar.png')} style={styles.icon}/>
          <TextInput
            placeholder="생년월일"
            onChangeText={ text => setBirthdate(text)}
            value={birth}
            style={styles.input}
            placeholderTextColor="#D1D1D1"
            placeholderStyle={{ fontFamily: 'Pretendard-Regular' }}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={styles.inputWrapper4}>
          {displayGenders.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.genderButton, { backgroundColor: gender === item ? '#AAAAAA' : '#E5E5E5' }]}
              onPress={() => setGender(item)}
            >
              <Text style={styles.genderText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.loginContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.SignButtonText}>회원 정보 수정</Text>
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
    width: '80%',
    marginBottom: 20
  },
  inputWrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  inputWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5'
  },
  inputWrapper3: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputWrapper4: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  inputDivider: {
    backgroundColor: '#AAAAAA',
    height: 1,
    width: '100%',
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
    width: '80%',
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
    color: '#D1D1D1',
    fontFamily: 'Pretendard-Regular',
  },
  SignButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Bold',
  },
  checkButton: {
    backgroundColor: '#F1F1F1',
    padding: 3,
    borderRadius: 5,
    width: '20%',
    marginHorizontal: 10,
    alignItems: 'center',
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
  },
  genderButton: {
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width:'30%',
  },
  genderText: {
    color: '#D1D1D1',
    fontSize: 20,
  }
});

export default EditProfileScreen;
