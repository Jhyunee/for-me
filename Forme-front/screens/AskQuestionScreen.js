import React, {useEffect, useState} from 'react';
import { Alert, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const { width, height } = Dimensions.get('window');

const AskQuestionScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleAskQuestion = async () => {
    const data = {
      title: title,
      content: content,
    };
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
  
      console.log('Sending request with:', { title, content });
      const response = await axios.post('http://172.16.11.224:8080/api/mypage/services', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken
        }
      });
  
      console.log(accessToken);
      if (response.status === 201) {
        Alert.alert('문의 등록이 완료되었습니다.');
        navigation.navigate('Service');
      } else {
        console.log("error", response);
      }
    } catch(err) {
      // 네트워크 오류 처리
      console.error('Network error:', err);
      Alert.alert('네트워크 오류', '네트워크 연결에 문제가 있습니다. 다시 시도해주세요.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navIcon}>
        <Image source={require('../assets/setting.png')} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.forMe}>For Me</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.icon}>
          <Image source={require('../assets/bell.png')} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
          <Image source={require('../assets/flame.png')} style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.customerServiceTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.customerServiceText}>문의글</Text>
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="내용을 입력해주세요"
        value={content}
        onChangeText={setContent}
        multiline={true}
        numberOfLines={5}
      />

      <TouchableOpacity
        style={styles.askButton}
        onPress={handleAskQuestion}
      >
        <Text style={styles.askButtonText}>문의 등록</Text>
      </TouchableOpacity>
      <View style={styles.versionInfoContainer}>
        <Text style={styles.versionInfo}>버전 정보 1.1.1</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomNavbar}>
          <TouchableOpacity style={styles.bottomIcon}>
            <Text>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}>
            <Text>✍️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}>
            <Text>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}>
            <Text>📊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}>
            <Text>👤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navIcon: {
    marginRight: 'auto',
  },
  forMe: {
    fontWeight: 'bold',
    color: '#508BFF',
    fontSize: 16,
  },
  navIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    maxHeight: height * 0.3, // 화면 높이의 30%만큼 최대 높이로 지정
    textAlignVertical: 'top', // 시작점부터 텍스트 입력
    width: '100%',
  },
  askButton: {
    backgroundColor: '#508BFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  askButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionInfoContainer: {
    alignItems: 'center',
  },
  versionInfo: {
    fontSize: 12,
    color: '#818181',
    paddingBottom: 10,
    paddingTop: 20,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomIcon: {
    marginLeft: 'auto',
  },
  customerServiceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerServiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
    flex: 1,
    textAlign:'center',
  },
  backButton: {
    marginRight: 10,
  },
});

export default AskQuestionScreen;