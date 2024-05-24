import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userId = 'hello';

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      // 비밀번호 변경 로직 구현
      console.log('Password changed successfully');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.forMe}>For Me</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.userId}>{userId}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#808080" // 회색 placeholder
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            placeholderTextColor="#808080" // 회색 placeholder
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
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
    marginBottom: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  userId: {
    flex: 1,
    fontSize: 16,
    color: '#696969',
    textAlign: 'left'
  },
  input: {
    flex: 2, 
    height: 40,
    backgroundColor: '#d3d3d3',
    color: '#696969', 
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#a9a9a9',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
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
});

export default ChangePasswordScreen;
