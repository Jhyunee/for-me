import React, {useEffect, useState} from 'react';
import { Alert, View, Text, TextInput, SafeAreaView, Button, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SvgXml } from 'react-native-svg';
import HorizontalLine from '../components/HorizontalLine';
import MenuBar from '../components/MenuBar';

const MyPageScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [achieve, setAchieve] = useState('');
  const [reward, setReward] = useState('');
  const [saving, setSaving] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [newReward, setNewReward] = useState('');
  const [dailyReward, setDailyReward] = useState(0);
  const [fontsLoaded] = useFonts({
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

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        const response = await axios.get('http://172.16.11.224:8080/mypage', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken
          }
        });
////
        // null이나 undefined일 때 0으로 처리
        setAchieve(response.data.achieve?.achieve ?? 0);
        setReward(response.data.reward.reward ?? 0);
        setSaving(response.data.saved?.saving ?? 0);
        setUserId(response.data.userInfo?.userId ?? '');
        setUserName(response.data.userInfo?.name ?? '');
        setUserEmail(response.data.userInfo?.email ?? '');
        const currentDate = new Date();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        // 이번 달 일수로 1일 노력금 계산
        const calculatedDailyReward = Math.round(response.data.reward.reward / daysInMonth);
        setDailyReward(calculatedDailyReward); // dailyReward 상태 업데이트
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, []);

  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    const data = {
      reward : newReward,
    };
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      console.log('Sending request with:', {newReward});
      const response = await axios.patch('http://172.16.11.224:8080/api/mypage/money', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken
        }
    });
      console.log('Received response:', response.data);
      if (response.status === 200) {
        Alert.alert('노력금 수정 성공');
        navigation.navigate('MyPage');
      } else {
        console.log("에러발생")
      }
    } catch (error) {
        console.error('Error', error);
      }

    setModalVisible(false);
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

    <View style={styles.userInfoContainer}>
      <View style={styles.userImageContainer}>
        <Image
          source={require('../assets/profile.jpg')}
          style={styles.profileImage}/>
      </View>
      <View style={styles.userinfoBox}>
        <View style={styles.usernameBox}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.defaultText}>님</Text>
        </View>
        <View style={styles.userIdBox}>
          <Text style={styles.defaultText}>아이디 : {userId}</Text>
        </View>
        <View style={styles.userIdBox}>
          <Text style={styles.defaultText}>이메일 : {userEmail}</Text>
        </View>
      </View>
    </View>
    <View style={styles.userMoneyContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.bigFont}>이번 달 쌓인 노력금</Text>
        <Text style={styles.defaultText}>{saving}원</Text>
        <Text style={styles.bigFont}>오늘의 달성율</Text>
        <Text style={styles.defaultText}>{Math.floor(achieve)}%</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.rightContainer}>
        <Text style={styles.bigFont}>노력금 설정</Text>
        <View style={styles.userMoneyBox}>
          <Text style={styles.defaultText}>1달 노력금 :</Text>
          <Text style={styles.defaultText}>{reward}</Text>
          <Text style={styles.defaultText}>원</Text>
        </View>
        <View style={styles.userMoneyBox}>
          <Text style={styles.defaultText}>1일 노력금 :</Text>
          <Text style={styles.defaultText}>{dailyReward}</Text>
          <Text style={styles.defaultText}>원</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>수정하기</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.menuText}>비밀번호 변경</Text>
        <Image source={require('../assets/right.png')} style={styles.rightIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.menuText}>회원 정보 수정</Text>
        <Image source={require('../assets/right.png')} style={styles.rightIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Notice')}>
        <Text style={styles.menuText}>공지사항</Text>
        <Image source={require('../assets/right.png')} style={styles.rightIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Service')}>
        <Text style={styles.menuText}>고객센터 (오류신고)</Text>
        <Image source={require('../assets/right.png')} style={styles.rightIcon}/>
      </TouchableOpacity>
    </View>

    <View style={[styles.versionInfoContainer]}>
      <TouchableOpacity style={styles.versionInfo} onPress={handleLogout}>
        <Text style={styles.versionInfo}>로그아웃</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.versionInfoContainer}>
      <Text style={styles.versionInfo}>버전 정보 1.1.1</Text>
    </View>
    <MenuBar onSelect={handleMenuSelect} />

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>1달 노력금</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNewReward}
              placeholder={`${reward}`}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>수정</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  userInfoContainer: {
    marginTop: 50,
    width: '90%',
    height: '15%',
    backgroundColor: '#6A9DFF',
    borderRadius: 10,
    flexDirection: 'row',
  },
  userMoneyContainer: {
    marginTop: 10,
    width: '90%',
    height: '20%',
    backgroundColor: '#6A9DFF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userImageContainer: {
    flex: 0.25,
    margin: 20,
    borderRadius: 70,
    overflow: 'hidden',
  },
  userinfoBox: {
    flex: 0.6,
  },
  userIdBox: {
    flexDirection: 'row',
  },
  userMoneyBox: {
    flexDirection: 'row',
    marginVertical: 5
  },
  usernameBox: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    color: '#ffffff',
  },
  userName: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 21,
    fontFamily: 'Pretendard-Bold'
  },
  bigFont: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
    fontFamily: 'Pretendard-Bold'
  },
  defaultText: {
    color: '#ffffff',
    fontFamily: 'Pretendard-Regular'
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  versionInfoContainer: {
    alignItems: 'center',
    height:'6%',
    justifyContent: 'center',
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
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#508BFF',
    padding: 5,
    width: 80,
    borderRadius: 5,
    marginTop: 10,
    alignItems:'center'
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Pretendard-Regular'
  },
  separator: {
    width: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '90%'
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular'
  },
  menuIcon: {
    color: '#000000',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#97BAFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Pretendard-Regular'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: '#000000',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalButtonText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular'
  },
  modalButtonCancel: {
    backgroundColor: '#FFFFFF',
  },
  modalButtonSave: {
    backgroundColor: '#1E90FF',
  }
});

export default MyPageScreen;