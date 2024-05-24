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

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />  
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Kakao" component={KakaoLogin} />
        <Stack.Screen options={{ headerShown: false }} name="Service" component={CustomerServiceScreen} />
        <Stack.Screen options={{ headerShown: false }} name="QnA" component={AskQuestionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="MyPage" component={MyPageScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
        <Stack.Screen options={{ headerShown: false }} name="Notice" component={NoticeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
