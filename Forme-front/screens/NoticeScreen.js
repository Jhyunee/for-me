import React, {useEffect, useState} from 'react';
import { Alert, SafeAreaView,View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import HorizontalLine from '../components/HorizontalLine';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuBar from '../components/MenuBar';

const NoticeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [informations, setinformations] = useState([]);
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

        const response = await axios.get('http://172.16.11.224:8080/api/mypage/notices', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken
          }
        });
        // console.log(response.data);
        setinformations(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, []);

  if (!fontsLoaded) {
    return <StatusBar />;
  }
  
  const handleInformationPress = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };


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
          <Text style={styles.menuText}>공지사항</Text>
          <HorizontalLine color="black" thickness={2} style={styles.horizontalLine} />
        </View>
      </View>
      
      <ScrollView style={styles.informationContainer}>
        {informations.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleInformationPress(index)}
            style={styles.informationItem}
          >
            <View style={styles.informationHeader}>
            <View style={styles.informationWrapper}>
            <Text style={styles.informationTitleText}>{item.title}</Text>
            <Text style={styles.informationDateText}>{item.createdAt}</Text>
            </View>
            <View>
        {expandedIndex === index ? (
        <Image source={require('../assets/right.png')} style={styles.indexIcon} />) : 
        (<Image source={require('../assets/down.png')} style={styles.indexIcon} />)}
        </View>
      </View>
      {expandedIndex === index && (
        <Text style={styles.informationDetail}>
          {item.content}
          {"\n"}
          {"\n"}
          <Text>작성자 : {item.admin_id}</Text>
        </Text>
      )}
      </TouchableOpacity>
    ))}
      </ScrollView>
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
  informationContainer: {
    flex: 1,
    width: '80%'
  },
  informationItem: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#D9D9D9'
  },
  informationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  informationWrapper: {
    flexDirection: 'column',
  },
  informationTitleText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular'
  },
  informationDateText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 8,
  },
  informationDetail: {
    marginTop: 10,
    color: '#818181',
    fontFamily: 'Pretendard-Regular',
  },
  indexIcon: {
    width: 15,
    height: 15
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

export default NoticeScreen;
