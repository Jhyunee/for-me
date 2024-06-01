import { StatusBar } from 'expo-status-bar';
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
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 모든 페이지 구현 완료시 삭제 예정 */}
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} />
        {/* 추가 */}
         <Stack.Screen options={{ headerShown: false }} name="MainT" component={MainScreenTest} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} /> 
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
        {/* 1차 완 -> 노력금 수정 핸들러 로직 확인 후 수정 필 */}
        <Stack.Screen options={{ headerShown: false }} name="MyPage" component={MyPageScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePasswordScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="Notice" component={NoticeScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        {/* 연동 필요, CSS 개선 필요 */}
        <Stack.Screen options={{ headerShown: false }} name="Community" component={CommunityScreen} />
        {/* 추가 */}
        <Stack.Screen options={{ headerShown: false }} name="Stat" component={StatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
