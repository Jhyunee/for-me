import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const AskQuestionScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const handleAskQuestion = async() => {
    try{
      const response = await fetch('http://10.0.2.2:8080/api/mypage/services',{
        method: 'POST',
        headers:{
          Accept : 'applicaiton/json',
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          title : title,
          content : content,
          user_id : userId,
        })
        
      })
      console.log('Title:', title);
      console.log('Content:', content);
    } catch(error){
      console.error(error);
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
      <TextInput
        style={styles.titleInput}
        placeholder="유저 아이디"
        value={userId}
        onChangeText={setUserId}
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
    marginRight: 'auto', // 가장 왼쪽 정렬
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
    marginLeft: 'auto', // 각각의 아이콘이 가장 오른쪽에 위치하도록
  },
});

export default AskQuestionScreen;