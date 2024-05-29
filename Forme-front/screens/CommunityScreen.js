import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import HorizontalLine from "../components/HorizontalLine";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    { amount: '6000원', date: '2024년 01월' },
    { amount: '7000원', date: '2024년 02월' },
    { amount: '8000원', date: '2024년 03월' },
    { amount: '9000원', date: '2024년 04월' },
    { amount: '10000원', date: '2024년 05월' },
  ];

  const handleNext = () => {
    if (currentIndex + 3 < data.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        
        <View style={styles.userMoneyContainer}>
          <Text style={styles.bigFont}>다른 유저들은 어떤 체크리스트를 작성할까요</Text>
          <Text>(랜덤한 유저들의 체크리스트 3개를 보여드려요.)</Text>
          <View style={styles.randomContainer}>
            <Text>뽀미 산책 시켜주기</Text>
          </View>
          <View style={styles.randomContainer}>
            <Text>3분동안 양치질 하기</Text>
          </View>
          <View style={styles.randomContainer}>
            <Text>장씨 할아버지랑 조깅</Text>
          </View>
        </View>

        <View style={styles.userMoneyContainer2}> 
          <Text style={styles.bigFont}>그동안 모은 노력금을 확인해보세요</Text>
          <View style={styles.checklistContainer}>
            <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
              <Text style={styles.arrowText}>{"<"}</Text>
            </TouchableOpacity>
            <FlatList
              data={data.slice(currentIndex, currentIndex + 3)}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.moneyContainer}>
                  <Text style={styles.amountText}>{item.amount}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              )}
              scrollEnabled={false}
            />
            <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
              <Text style={styles.arrowText}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fontContainer}>
          <Text style={styles.bigFont2}>다른 유저들의</Text>
          <Text style={styles.bigFont2}>노력금은 얼마일까요?</Text>
          <HorizontalLine color="black" thickness={2} marginVertical={20} />
        </View>

        <View style={styles.otherUserContainer}>
          <View style={styles.leftContainer}>
            <Text>세현님은 또래 유저들의 평균 노력금보다 40% 적은 노력금을 설정했어요!</Text>
          </View>
          <View style={styles.rightContainer}>
          <Text>세현님은 여성 유저들의 평균 노력금보다 40% 적은 노력금을 설정했어요!</Text>
          </View>
        </View>

        <View style={styles.fontContainer}>
          <Text style={styles.bigFont2}>다른 유저들은</Text>
          <Text style={styles.bigFont2}>잘 달성하고 있을까요?</Text>
          <HorizontalLine color="black" thickness={2} marginVertical={20} />
        </View>

        <View style={styles.otherUserContainer}>
          <View style={styles.leftContainer}>
            <Text>hi</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text>hi</Text>
          </View>
        </View>
        
        <View style={[styles.versionInfoContainer, { marginVertical: 40 }]}>
          <Text style={styles.versionInfo}>로그아웃</Text>

        </View>

        <View style={[styles.versionInfoContainer, { marginVertical: 40 }]}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  userMoneyContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#508bff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  userMoneyContainer2: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#508bff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  otherUserContainer: {
    marginTop: 10,
    width: '100%',
    height: '20%',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  randomContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  checklistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  moneyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 5,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
   
    fontSize: 12,
    color: '#888888',
  },
  fontContainer: {
    marginTop: 10,
    width: '100%',
    height: '10%',
  },
  bigFont: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 5,
  },
  bigFont2: {
    fontSize: 20,
    color: 'black',
    marginTop: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navIcon: {
    marginRight: 'auto',
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  versionInfoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  versionInfo: {
    fontSize: 12,
    color: '#818181',
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomIcon: {
    marginLeft: 'auto',
  },
  leftContainer: {
    flex: 1,
    width: '40%',
    alignItems: 'center',
    margin: 5,
    backgroundColor:'gray',
    height:'100%',
    borderRadius: 15,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    backgroundColor:'gray',
    height:'100%',
    borderRadius: 15,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default CommunityScreen;
