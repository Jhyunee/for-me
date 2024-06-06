import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import HorizontalLine from '../components/HorizontalLine';
import { SvgXml } from 'react-native-svg';
import MenuBar from '../components/MenuBar';

const CustomerServiceScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
  });

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

        const response = await axios.get('http://172.16.11.224:8080/api/mypage/services', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken
          }
        });
        // console.log(response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchData();
  }, []);

  // 로그인 상태 확인
  const isLoggedIn = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      return !!accessToken; // accessToken이 있으면 true, 없으면 false 반환
    } catch (error) {
      console.error('Error checking login status:', error);
      return false; // 에러 발생 시 일단 로그인 상태가 아닌 것으로 간주
    }
  };

  // 문의 남기기 버튼 클릭 핸들러
  const handleAskQuestion = async () => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      // 로그인이 되어 있지 않은 경우 알림 띄우기
      Alert.alert('로그인을 먼저 해주세요!','로그인을 한 상태의 유저만 문의글 남기기가 가능합니다.');
      // 로그인 화면으로 이동하도록 설정
      navigation.navigate('Login');
      return;
    }
    // 로그인이 되어 있을 때 -> asyncstorage에 accessToken 존재할 때
    navigation.navigate('QnA');
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleGetContent = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  if (!fontsLoaded) {
    return <StatusBar />;
  }
  

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
      <View style={styles.menuBarContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/left.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.menuWrapper}>
          <Text style={styles.menuText}>고객센터</Text>
          <HorizontalLine color="black" thickness={2} style={styles.horizontalLine} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <Image source={require('../assets/search.png')} style={styles.searchIcon}/>
        </TouchableOpacity>
        <TextInput
          placeholder="궁금한 점을 검색해보세요"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          style={styles.searchInput}
        />
      </View>
      </View>
      <Image
        source={require('../assets/qa_icon.png')}
        style={styles.qaIcon}
        resizeMode="contain"
      />
      <ScrollView style={styles.questionContainer}>
        {questions.map((item, index) => (
        <TouchableOpacity
        key={item.id}
        onPress={() => handleGetContent(index)}
        style={styles.questionItem}
        >
      <View style={styles.questionHeader}>
        <View style={styles.questionWrapper}>
        <Text style={styles.questionTitleText}>{item.title}</Text>
        <Text style={styles.qustionDateText}>{item.createdAt}</Text>
        </View>
        <View>
        {expandedIndex === index ? (
        <Image source={require('../assets/right.png')} style={styles.indexIcon} />) : 
        (<Image source={require('../assets/down.png')} style={styles.indexIcon} />)}
        </View>
      </View>
      {expandedIndex === index && (
        <Text style={styles.questionDetail}>
          {item.content}
          {"\n"}
          {"\n"}
          <Text>작성자 : {item.user_id}</Text>
        </Text>
      )}
    </TouchableOpacity>
  ))}
</ScrollView>
      <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
        <Text style={styles.buttonText}>문의 남기기</Text>
      </TouchableOpacity>
      <View style={styles.versionInfoContainer}>
        <Text style={styles.versionInfo}>버전 정보 1.1.1</Text>
      </View>
      <MenuBar onSelect={handleMenuSelect} />
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
  menuBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  menuWrapper: {
    flexDirection: 'column',
    width:'70%',
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#515151',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
  },
  searchContainer: {
    width: '70%'
  },
  searchWrapper: {
    flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9'
  },
  searchButton: {
    backgroundColor: '#D9D9D9',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
        marginLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 5
  },
  searchInput:{
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  qaIcon: {
    alignSelf: 'center',
    flex: 1
  },
  questionContainer: {
    flex: 1,
    width: '70%'
  },
  questionItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#D9D9D9'
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  questionWrapper: {
    flexDirection: 'column',
  },
  questionTitleText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular'
  },
  qustionDateText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 8,
  },
  questionDetail: {
    marginTop: 10,
    color: '#818181',
    fontFamily: 'Pretendard-Regular',
  },
  indexIcon: {
    width: 15,
    height: 15
  },
  askButton: {
    backgroundColor: '#97BAFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 60,
    width: '30%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular'
  },
  versionInfoContainer: {
    alignItems: 'center',
    height:'10%',
    justifyContent: 'flex-start',
    marginVertical: 20
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
  menuIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomerServiceScreen;