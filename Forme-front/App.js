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

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} />
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
        <Stack.Screen options={{ headerShown: false }} name="Service" component={CustomerServiceScreen} />
        <Stack.Screen options={{ headerShown: false }} name="QnA" component={AskQuestionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="MyPage" component={MyPageScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
        <Stack.Screen options={{ headerShown: false }} name="Notice" component={NoticeScreen} />
        {/* 완료 */}
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Community" component={CommunityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
