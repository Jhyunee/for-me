import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import KakaoLogin from './screens/KakaoScreen';
import CustomerServiceScreen from './screens/CustomerServiceScreen';
import AskQuestionScreen from './screens/AskQuestionScreen';
import MyPageScreen from './screens/MyPage';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import EditProfile from './screens/EditProfileScreen';
import NoticeScreen from './screens/NoticeScreen';
import SignUpScreen from './screens/SignUpScreen';
import CommunityScreen from './screens/CommunityScreen';
import FindPasswordScreen from './screens/FindPasswordScreen';
import FindIdScreen from './screens/FindIdScreen';
import StatScreen from './screens/StatScreen'; //추가
import MainScreenTest from './screens/MainScreen_test'; //추가

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
  checkToken();
}, []);

const checkToken = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  setIsLoggedIn(!!accessToken); // 토큰이 있으면 true, 없으면 false 설정
};


  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />

      <Stack.Screen options={{ headerShown: false }} name="MainT" component={MainScreenTest} />

        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />

        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="FindPw" component={FindPasswordScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="FindId" component={FindIdScreen} />
        {/* 보류 */}
        <Stack.Screen options={{ headerShown: false }} name="Kakao" component={KakaoLogin} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="Service" component={CustomerServiceScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="QnA" component={AskQuestionScreen} />
        {/* 완료*/}
        <Stack.Screen options={{ headerShown: false }} name="MyPage" component={MyPageScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePasswordScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="Notice" component={NoticeScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="Community" component={CommunityScreen} />
        {/* 추가 */}
        <Stack.Screen options={{ headerShown: false }} name="Stat" component={StatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
