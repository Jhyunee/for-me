import React, {useEffect, useState} from 'react';
import { Alert, FlatList, View, Text, ScrollView, TextInput, SafeAreaView, Button, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SvgXml } from 'react-native-svg';
import HorizontalLine from '../components/HorizontalLine';; 
import MenuBar from '../components/MenuBar';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ageAchieve, setAgeAchieve] = useState('');
  const [genAchieve, setGenAchieve] = useState('');
  const [myAchieve, setMyAchieve] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [monthlyReward, setMonthlyReward] = useState([]);
  const [ageReward, setAgeReward] = useState('');
  const [genderReward, setGenderReward] = useState('');
  const [myReward, setMyReward] = useState('');
  const [sortedChecklist, setSortedChecklist] = useState([]);
  const [gender, setGender] = useState('');
  const [genderData, setgenderData] = useState('');
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
  });
  if (!fontsLoaded) {
    return <StatusBar />;
  }

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

        const response = await axios.get('http://172.16.11.224:8080/community', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken
          }
        });
        console.log(response.data);
        setAgeAchieve(response.data.achieve.ageAchieve ?? 0);
        setGenAchieve(response.data.achieve.genAchieve ?? 0);
        setMyAchieve(response.data.achieve.myAchieve ?? 0);
        setChecklist(response.data.checklist ?? {});
        setMonthlyReward(response.data.monthlyReward ?? []);
        setAgeReward(response.data.reward.ageReward ?? 0);
        setGenderReward(response.data.reward.genderReward ?? 0);
        setMyReward(response.data.reward.myReward ?? 0);
        setGender(response.data.achieve.myGender?? 0);
        const sortedChecklist = Object.entries(response.data.checklist).sort(([key1], [key2]) => Number(key1) - Number(key2)).map(([key, value]) => value);
        setSortedChecklist(sortedChecklist);

        if(response.data.achieve.myGender === 'f'){
          setgenderData('여성');
        }
        else{
          setgenderData('남성');
        }

      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (currentIndex + 3 < monthlyReward.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('로그아웃 도중 문제가 발생했습니다.', error);
    }
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
          <Text style={styles.menuText}>커뮤니티</Text>
          <HorizontalLine color="black" thickness={2} style={styles.horizontalLine} />
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.scrollViewContent}>
          <View style={styles.randomChecklistContainer}>
            <Text style={styles.listInfoFont}>다른 유저들은 어떤 체크리스트를 작성할까요?</Text>
            <Text style={styles.defaultText}>(랜덤한 유저들의 체크리스트 3개를 보여드려요)</Text>
            <View style={styles.randomContainer}>
              <Text style={styles.defaultText}>{sortedChecklist[0]}</Text>
            </View>
            <View style={styles.randomContainer}>
              <Text style={styles.defaultText}>{sortedChecklist[1]}</Text>
            </View>
            <View style={styles.randomContainer}>
              <Text style={styles.defaultText}>{sortedChecklist[2]}</Text>
            </View>
          </View>
          
          <View style={styles.userRewardContainer}>
            <Text style={styles.listInfoFont}>그동안 모은 노력금을 확인해보세요</Text>
            <View style={styles.rewardContainer}>
              <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                <Image source={require('../assets/left.png')} style={styles.arrowImage}/>
              </TouchableOpacity>
              <View style={styles.moneyWrapper}>
                <FlatList
                  data={monthlyReward.slice(currentIndex, currentIndex + 3)}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  renderItem={({ item }) => (
                    <View style={styles.moneyContainer}>
                      <Text style={styles.rewardText}>{Math.floor(item.monthly_reward)}원</Text>
                      <Text style={styles.dateText}>{item.dateid}월</Text>
                    </View>
                  )}
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                <Image source={require('../assets/right.png')} style={styles.arrowImage}/>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.fontContainer}>
            <Text style={styles.bigFont}>다른 유저들과</Text>
            <Text style={styles.bigFont}>노력금을 비교해보세요</Text>
            <HorizontalLine color="black" thickness={2} marginVertical={20} />
          </View>

          <View style={styles.compareContainer}>
            <View style={styles.blueCompareContainer}>
              <Text style={styles.defaultText}>또래 유저들보다</Text>
              {ageReward > myReward ? (
                    <Text style={styles.defaultText}>노력금이 적어요</Text>
                  ) : (
                    <Text style={styles.defaultText}>노력금이 많아요</Text>
                  )}
              <View style={styles.compareWrapper1}>
              <View style={styles.compareWrapper2}>
              {ageReward > myReward ? (
                    <Image source={require('../assets/pigB.png')} style={styles.compareIcon}/>
                  ) : (
                    <Image source={require('../assets/pigS.png')} style={styles.compareIcon}/>
                  )}
                <Text style={styles.defaultText}>{ageReward}</Text>
                <Text style={styles.defaultText}>또래</Text>
                </View>
                <View style={styles.compareWrapper2}>
                {ageReward > myReward ? (
                    <Image source={require('../assets/pigS.png')} style={styles.compareIcon}/>
                  ) : (
                    <Image source={require('../assets/pigB.png')} style={styles.compareIcon}/>
                  )}
                <Text style={styles.defaultText}>{myReward}</Text>
                <Text style={styles.defaultText}>나</Text>
                </View>
              </View>
            </View>
            <View style={styles.defaultCompareContainer}>
            <Text style={styles.defaultText}>{genderData} 유저들보다</Text>
            {genderReward > myReward ? (
                    <Text style={styles.defaultText}>노력금이 적어요</Text>
                  ) : (
                    <Text style={styles.defaultText}>노력금이 많아요</Text>
                  )}
            <View style={styles.compareWrapper1}>
            <View style={styles.compareWrapper2}>
              {genderReward > myReward ? (
                    <Image source={require('../assets/pigB.png')} style={styles.compareIcon}/>
                  ) : (
                    <Image source={require('../assets/pigS.png')} style={styles.compareIcon}/>
                  )}
                <Text style={styles.defaultText}>{genderReward}</Text>
                <Text style={styles.defaultText}>{genderData}</Text>
                </View>
                <View style={styles.compareWrapper2}>
                {genderReward > myReward ? (
                    <Image source={require('../assets/pigS.png')} style={styles.compareIcon}/>
                  ) : (
                    <Image source={require('../assets/pigB.png')} style={styles.compareIcon}/>
                  )}
                <Text style={styles.defaultText}>{myReward}</Text>
                <Text style={styles.defaultText}>나</Text>
                </View>
              </View>
            </View>
          </View>
        <Text>{"\n"}</Text>
        <View style={styles.fontContainer}>
          <Text style={styles.bigFont}>다른 유저들과</Text>
          <Text style={styles.bigFont}>달성률을 비교해보세요</Text>
          <HorizontalLine color="black" thickness={2} marginVertical={20} />
        </View>

        <View style={styles.compareContainer}>
          <View style={styles.blueCompareContainer}>
          {ageAchieve == myAchieve ? (
              <Text style={styles.defaultText}>또래 유저들과</Text>
            ) : (<Text style={styles.defaultText}>또래 유저들보다</Text>)}
             {ageAchieve == myAchieve ? (
            <Text style={styles.defaultText}>달성률이 같아요</Text>
            ) : (
              ageAchieve > myAchieve ? (
              <Text style={styles.defaultText}>달성률이 낮아요</Text>
              ) : (
               <Text style={styles.defaultText}>달성률이 높아요</Text>
            ))}
            <View style={styles.compareWrapper1}>
                <View style={styles.compareWrapper3}>
                <View style={styles.compareWrapper2}>
                {ageAchieve == myAchieve ? (
            <View style={[styles.worseBox, {height: 25}]}></View>
            ) : (
              ageAchieve > myAchieve ? (
                <View style={[styles.worseBox, {height: 35}]}></View>
              ) : (
                <View style={[styles.worseBox, {height: 25}]}></View>
            ))}
                  <Text style={styles.defaultText}>{Math.round(ageAchieve*100)/100}</Text>
                  <Text style={styles.defaultText}>또래</Text>
                </View>
                <View style={styles.compareWrapper2}>
                {ageAchieve == myAchieve ? (
            <View style={[styles.betterBox, {height: 25}]}></View>
            ) : (
              ageAchieve > myAchieve ? (
                <View style={[styles.betterBox, {height: 25}]}></View>
              ) : (
                <View style={[styles.betterBox, {height: 35}]}></View>
            ))}
                  <Text style={styles.defaultText}>{Math.round(myAchieve*100)/100}</Text>
                  <Text style={styles.defaultText}>나</Text>
                </View>
                </View>
              </View>
          </View>
          <View style={styles.defaultCompareContainer}>
            {genAchieve == myAchieve ? (
              <Text style={styles.defaultText}>{genderData} 유저들과</Text>
            ) : (<Text style={styles.defaultText}>{genderData} 유저들보다</Text>)}
            {genAchieve == myAchieve ? (
            <Text style={styles.defaultText}>달성률이 같아요</Text>
            ) : (
              genAchieve > myAchieve ? (
              <Text style={styles.defaultText}>달성률이 낮아요</Text>
              ) : (
               <Text style={styles.defaultText}>달성률이 높아요</Text>
            ))}
            <View style={styles.compareWrapper1}>
            <View style={styles.compareWrapper3}>
                <View style={styles.compareWrapper2}>
                {genAchieve == myAchieve ? (
            <View style={[styles.worseBox, {height: 25}]}></View>
            ) : (
              genAchieve > myAchieve ? (
                <View style={[styles.worseBox, {height: 35}]}></View>
              ) : (
                <View style={[styles.worseBox, {height: 25}]}></View>
            ))}
                
                  <Text style={styles.defaultText}>{Math.round(genAchieve*100)/100}</Text>
                  <Text style={styles.defaultText}>{genderData}</Text>
                </View>
                <View style={styles.compareWrapper2}>
                {genAchieve == myAchieve ? (
            <View style={[styles.betterBox, {height: 25}]}></View>
            ) : (
              genAchieve > myAchieve ? (
                <View style={[styles.betterBox, {height: 25}]}></View>
              ) : (
                <View style={[styles.betterBox, {height: 35}]}></View>
            ))}
                  <Text style={styles.defaultText}>{Math.round(myAchieve*100)/100}</Text>
                  <Text style={styles.defaultText}>나</Text>
                </View>
            </View>
            </View>
          </View>
        </View>
        
        <View style={styles.versionInfoContainer}>
          <View style={[styles.versionInfoContainer, { marginTop: 40}]}>
          <TouchableOpacity style={styles.versionInfo} onPress={handleLogout}>
            <Text style={styles.versionInfo}>로그아웃</Text>
          </TouchableOpacity>
          <Text style={styles.versionInfo}>버전 정보 1.1.1</Text>
        </View>
</View>
        </View>
      </ScrollView>
      <MenuBar onSelect={handleMenuSelect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  scrollContainer: {
    height:'80%',
    paddingBottom: 300,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  randomChecklistContainer: {
    width: '90%',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10
  },
  listInfoFont: {
    fontSize: 18,
    color: '#000000',
    marginTop: 5,
    fontFamily: 'Pretendard-Bold',
  },
  defaultText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular'
  },
  randomContainer: {
    width: '100%',
   backgroundColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  userRewardContainer: {
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  rewardContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowButton: {
    padding: 5
  },
  arrowImage: {
    width: 20,
    height: 20
  },
  moneyWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  moneyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 5
  },
  rewardText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Pretendard-Bold'
  },
  dateText: {
    fontSize: 10,
    color: '#B2B2B2',
    fontFamily: 'Pretendard-Regular'
  },
  fontContainer: {
    marginTop: 10,
    width: '90%'
  },
  bigFont: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Pretendard-Bold'
  },
  compareContainer: {
    width: '90%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defaultCompareContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    margin: 5,
    backgroundColor:'#EEEEEE',
    height: 140,
    borderRadius: 15,
  },
  blueCompareContainer: {
    flex: 1,
    marginTop: 40,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor:'#97BAFF',
    height: 140,
    borderRadius: 15,
  },
  compareWrapper1: {
    width: '70%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compareWrapper2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareWrapper3: {
    paddingHorizontal:25,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  compareIcon: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  versionInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  versionInfo: {
    fontSize: 12,
    color: '#D1D1D1',
    fontFamily: 'Pretendard-Regular',
    height: 40
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
  betterBox: {
    width: 20,
    height: 35,
    backgroundColor: '#508BFF',
    borderRadius: 5,
    marginHorizontal: 10
  },
  worseBox: {
    width:20,
    height: 25,
    backgroundColor: '#D1D1D1',
    borderRadius: 5
  },
});

export default CommunityScreen;
