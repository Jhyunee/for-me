import React, {useEffect, useState} from 'react';
import { Alert, View, Text, TextInput, SafeAreaView, Button, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SvgXml } from 'react-native-svg';
import HorizontalLine from '../components/HorizontalLine';


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
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
  });
  if (!fontsLoaded) {
    return <StatusBar />;
  }
  
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
        console.log(response.data);
        // null이나 undefined일 때 0으로 처리
        setAchieve(response.data.achieve?.achieve ?? 0);
        setReward(response.data.reward ?? 0);
        setSaving(response.data.saved?.saving ?? 0);
        setUserId(response.data.userInfo?.userId ?? '');
        setUserName(response.data.userInfo?.name ?? '');
        setUserEmail(response.data.userInfo?.email ?? '');
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
      const response = await axios.post('http://172.16.11.224:8080/api/mypage/money', data, {
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

    // svg 문제로 일단 하드코딩 해둠
    const HomeSvg = `
    <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="#FFFFFF"/>
    </svg>
    `;
    const StatSvg = `
    <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM13.75 10C13.75 10.4142 14.0858 10.75 14.5 10.75H15.1893L13.1768 12.7626C13.0791 12.8602 12.9209 12.8602 12.8232 12.7626L11.2374 11.1768C10.554 10.4934 9.44598 10.4934 8.76256 11.1768L6.46967 13.4697C6.17678 13.7626 6.17678 14.2374 6.46967 14.5303C6.76256 14.8232 7.23744 14.8232 7.53033 14.5303L9.82322 12.2374C9.92085 12.1398 10.0791 12.1398 10.1768 12.2374L11.7626 13.8232C12.446 14.5066 13.554 14.5066 14.2374 13.8232L16.25 11.8107V12.5C16.25 12.9142 16.5858 13.25 17 13.25C17.4142 13.25 17.75 12.9142 17.75 12.5V10C17.75 9.58579 17.4142 9.25 17 9.25H14.5C14.0858 9.25 13.75 9.58579 13.75 10Z" fill="#FFFFFF"/>
  </svg>
    `;
    const CommSvg = `
    <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#FFFFFF"/>
  </svg>
    `;
  
    const UserSvg = `
    <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#FFFFFF"/>
  </svg>
    `;
  
    const WriteSvg = `
    <svg fill="#FFFFFF" width="37px" height="37px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>note-edit-solid</title>
      <path d="M33,6.4,29.3,2.7a1.71,1.71,0,0,0-2.36,0L23.65,6H6A2,2,0,0,0,4,8V30a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V11.76l3-3A1.67,1.67,0,0,0,33,6.4ZM18.83,20.13l-4.19.93,1-4.15,9.55-9.57,3.23,3.23ZM29.5,9.43,26.27,6.2l1.85-1.85,3.23,3.23Z" class="clr-i-solid clr-i-solid-path-1"></path>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
  </svg>
    `;

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
        <Text style={styles.defaultText}>{achieve}%</Text>
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
          <Text style={styles.defaultText}>{reward / 30}</Text>
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
    <View style={styles.menuBar}>
      <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Main')}>
          <SvgXml xml={HomeSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Stat')}>
          <SvgXml xml={StatSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Community')}>
          <SvgXml xml={CommSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('MyPage')}>
          <SvgXml xml={UserSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} Community>
          <SvgXml xml={WriteSvg} />
          </TouchableOpacity>
      </View>
    </View>

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
              value={newReward}
              keyboardType="numeric"
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
  },
});

export default MyPageScreen;