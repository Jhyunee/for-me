import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const MyPageScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [monthlyEffort, setMonthlyEffort] = useState('30,000');
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          // 토큰이 존재하는 경우에만 유저 정보를 가져옴
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.sub);
          console.log(userId);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
  
    fetchToken();
  }, []);

  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // 노력금 수정 핸들러
  const handleSave = () => {

    setModalVisible(false);
  };

  const handleLogin = async () => {
    try {
        console.log('Sending request with:', { userId, password }); // 요청 전 로그

        const response = await axios.post('192.168.0.6:8080/login', {
            userId: userId,
            password: password,
        });

        console.log('Received response:', response); // 응답 후 로그

        if (response.status === 200) {
            // 로그인 성공
            const AccessToken = response.headers.get("Authorization").replace('Bearer ', '');
            const RefreshToken = response.headers["refresh-token"];
            
            console.log("액세스 토큰:", AccessToken);
            console.log("리프레시 토큰:", RefreshToken);
            
            await AsyncStorage.setItem('accessToken', AccessToken);
            await AsyncStorage.setItem('refreshToken', RefreshToken);
            
            const decodedToken = jwtDecode(AccessToken);
            
            console.log(decodedToken);

            Alert.alert('Success', 'Logged in successfully!');
            navigation.navigate('MyPage');
        } else {
            // 로그인 실패
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        Alert.alert('Error', 'Failed to log in. Please try again later.');
    }
};

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navIcon}>
          <Text>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.forMe}>For Me</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.icon}>
            <Text>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Text>🔥</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userInfoContainer}>
        <View style={styles.userImageContainer}>
          <Image
            source={require('../assets/profile.jpg')}
            style={styles.profileImage}/>
        </View>
        <View style={styles.userinfoBox}>
          <View style={styles.usernameBox}>
            <Text style={styles.userName}>세현</Text>
            <Text style={styles.defaultText}>님</Text>
          </View>
          <View style={styles.userIdBox}>
            <Text style={styles.defaultText}>아이디 :</Text>
            <Text style={styles.defaultText}>hello</Text>
          </View>
          <View style={styles.userIdBox}>
            <Text style={styles.defaultText}>이메일 :</Text>
            <Text style={styles.defaultText}>hello@kakao.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.userMoneyContainer}>
        {/* 노력금과 달성율을 표시하는 부분 */}
        <View style={styles.leftContainer}>
          <Text style={styles.bigFont}>누적 노력금</Text>
          <Text style={styles.defaultText}>100,000원</Text>
          <Text style={styles.bigFont}>이번 달 쌓인 노력금</Text>
          <Text style={styles.defaultText}>14,000원</Text>
          <Text style={styles.bigFont}>오늘의 달성율</Text>
          <Text style={styles.defaultText}>37.5%</Text>
        </View>
        <View style={styles.separator} />
        {/* 노력금 설정 및 수정 버튼을 표시하는 부분 */}
        <View style={styles.rightContainer}>
          <Text style={styles.bigFont}>노력금 설정</Text>
          <View style={styles.userMoneyBox}>
            <Text style={styles.defaultText}>1달 노력금 :</Text>
            <Text style={styles.defaultText}>30,000</Text>
            <Text style={styles.defaultText}>원</Text>
          </View>
          <View style={styles.userMoneyBox}>
            <Text style={styles.defaultText}>1일 노력금 :</Text>
            <Text style={styles.defaultText}>1,000</Text>
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
          <Text style={styles.menuIcon}>▶️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.menuText}>회원 정보 수정</Text>
          <Text style={styles.menuIcon}>▶️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Notice')}>
          <Text style={styles.menuText}>공지사항</Text>
          <Text style={styles.menuIcon}>▶️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Service')}>
          <Text style={styles.menuText}>고객센터 (오류신고)</Text>
          <Text style={styles.menuIcon}>▶️</Text>
        </TouchableOpacity>
      </View>



      <View style={[styles.versionInfoContainer, { marginVertical: 40 }]}>
        <Text style={styles.versionInfo}>로그아웃</Text>
      </View>
      <View style={[styles.versionInfoContainer, { marginVertical: 40 }]}>
        <Text style={styles.versionInfo}>버전 정보 1.1.1</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomNavbar}>
          <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Community')}>
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
              onChangeText={setMonthlyEffort}
              value={monthlyEffort}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  userInfoContainer: {
    marginTop: 50,
    width: '100%',
    height: '15%',
    backgroundColor: '#508bff',
    borderRadius: 15,
    flexDirection: 'row',
  },
  userMoneyContainer: {
    marginTop: 10,
    width: '100%',
    height: '20%',
    backgroundColor: '#508bff',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userImageContainer: {
    flex: 0.24,
    margin: 20,
    borderRadius: 70,
    overflow: 'hidden',
  },
  userinfoBox: {
    flex: 0.6,
  },
  listContainer: {
    backgroundColor: '#508bff',
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
  },
  bigFont: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 5
  },
  defaultText: {
    color: '#ffffff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
    marginLeft: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  versionInfoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  versionInfo: {
    fontSize: 12,
    color: '#818181',
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
  leftContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
  separator: {
    width: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 20,
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
    fontSize: 16,
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
  },
  modalButtonCancel: {
    backgroundColor: '#FFFFFF',
  },
  modalButtonSave: {
    backgroundColor: '#1E90FF',
  },
});

export default MyPageScreen;