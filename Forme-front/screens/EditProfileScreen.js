import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('여자');
  const genders = ['남자', '여자']; // 성별 선택지

  const handleUpdateProfile = () => {
    // 회원 정보 수정 호출
    console.log('회원정보 수정완료');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.forMe}>For Me</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="황세현"
            placeholderTextColor="#808080"
            onChangeText={setName}
            value={name}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>📞</Text>
          <TextInput
            style={styles.input}
            placeholder="010-1234-5678"
            placeholderTextColor="#808080"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>✉️</Text>
          <TextInput
            style={styles.input}
            placeholder="hello@kakao.com"
            placeholderTextColor="#808080"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🎂</Text>
          <TextInput
            style={styles.input}
            placeholder="2024-01-01"
            placeholderTextColor="#808080"
            onChangeText={setBirthdate}
            value={birthdate}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>⚧️</Text>
          {genders.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.genderButton, { backgroundColor: gender === item ? '#909090' : '#d3d3d3' }]}
              onPress={() => setGender(item)}
            >
              <Text style={styles.genderText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>회원 정보 수정</Text>
      </TouchableOpacity>

      <View style={styles.versionInfoContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Service')}>
          <Text style={styles.customerService}>고객센터</Text>
        </TouchableOpacity>
        <Text style={styles.footerForMe}>For Me</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  navbar: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  forMe: {
    fontWeight: 'bold',
    color: '#508BFF',
    fontSize: 25,
  },
  box: {
    width: '80%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  versionInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  customerService: {
    fontSize: 12,
    color: '#D9D9D9',
  },
  footerForMe: {
    fontSize: 16,
    color: '#D9D9D9',
    marginTop: 10,
  },
  genderButton: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  genderText: {
    color: '#ffffff',
    fontSize: 16,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default EditProfileScreen;
