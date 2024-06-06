import React, { useState } from 'react';
import { Alert, View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import HorizontalLine from '../components/HorizontalLine';
import { SvgXml } from 'react-native-svg';
import MenuBar from '../components/MenuBar';

const AskQuestionScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  let [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
  });
  if (!fontsLoaded) {
    return <StatusBar />;
  }
  const handleMenuSelect = (selection) => {
    console.log('Menu selected:', selection);
    // Navigate to the selected screen
    navigation.navigate(selection);
  };

  const handleAskQuestion = async () => {
    const data = { title, content };
    if (!title.trim()) {
      Alert.alert('제목 필수', '제목을 입력해주세요.');
      return;
    }
  
    if (!content.trim()) {
      Alert.alert('내용 필수', '내용을 입력해주세요.');
      return;
    }
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      const response = await axios.post('http://172.16.11.224:8080/api/mypage/services', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken
        }
      });

      if (response.status === 201) {
        Alert.alert('등록 완료', '문의 등록이 완료되었습니다.');
        navigation.navigate('Service');
      } else {
        console.log('error', response);
      }
    } catch (err) {
      console.error('Network error:', err);
      Alert.alert('네트워크 오류', '네트워크 연결에 문제가 있습니다. 다시 시도해주세요.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.leftNavIcon}>
          <Image source={require('../assets/settings.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.mainLogo}>For Me</Text>
        </View>
        <View style={styles.rightNavIcons}>
          <TouchableOpacity style={styles.icon}>
            <Image source={require('../assets/notion.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.endIcon}>
            <Image source={require('../assets/fire.png')} style={styles.endIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalLine color="black" thickness={2} style={styles.horizontalLine} />
      <View style={styles.menuBarContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/left.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.menuWrapper}>
          <Text style={styles.menuText}>문의글</Text>
          <HorizontalLine color="black" thickness={2} style={styles.horizontalLine} />
        </View>
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력해주세요."
        onChangeText={text => setTitle(text)}
        value={title}
        placeholderTextColor="#B3B3B3"
      />
      <TextInput
        style={styles.contentInput}
        placeholder="내용을 입력해주세요."
        onChangeText={text => setContent(text)}
        value={content}
        placeholderTextColor="#B3B3B3"
        multiline={true}
        numberOfLines={5}
      />
      <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
        <Text style={styles.buttonText}>문의 등록</Text>
      </TouchableOpacity>
      <View style={styles.versionInfoContainer}>
        <Text style={styles.versionInfo}>버전 정보 1.1.1</Text>
      </View>
      <MenuBar onSelect={handleMenuSelect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40
  },
  navbar: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  leftNavIcon: {
    width: 30,
    height: 30
  },
  icon: {
    width: 25,
    height: 25
  },
  endIcon: {
    width: 25,
    height: 25
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  mainLogo: {
    color: '#508bff',
    fontFamily: 'Inter-ExtraBoldItalic',
    fontSize: 40,
    textAlign: 'center',
    marginLeft: 30
  },
  rightNavIcons: {
    flexDirection: 'row',
  },
  menuBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  menuWrapper: {
    flexDirection: 'column',
    width:'70%',
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#515151',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '90%',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 250,
    textAlignVertical: 'top',
    width: '90%',
  },
  askButton: {
    backgroundColor: '#97BAFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 20,
    width: '30%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular'
  },
  versionInfoContainer: {
    alignItems: 'center',
    height:'20%',
    justifyContent: 'flex-end'
  },
  versionInfo: {
    fontSize: 12,
    color: '#D1D1D1',
    fontFamily: 'Pretendard-Regular'
  },
  menuBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#508BFF',
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  menuIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AskQuestionScreen;
