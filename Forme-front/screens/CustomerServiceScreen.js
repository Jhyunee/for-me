import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const CustomerServiceScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  
  const getDatas = async () => {
    try {
        const response = await fetch('http://10.0.2.2:8080/api/mypage/services');
        const json = await response.json();
        setData(json);
    } catch(error){
        console.error(error);
    }
  }

  useEffect(() => {
    getDatas();
  },[]);

  const [questions, setQuestions] = useState([
    { content: "마이페이지 클릭 오류납니다..", date: "2024-04-20" },
    { content: "비밀번호 변경이 안되네요ㅠㅠ", date: "2024-04-19" },
    { content: "이미 삭제한 항목 복구는 안되나요?", date: "2024-04-18" },
    { content: "항목 이름 중복이라고 뜨네요,,", date: "2024-04-17" }
    
  ]);

  const handleSearch = () => {
    // 검색 기능
    console.log('Search query:', searchQuery);
  };

  const handleQuestionPress = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const handleAskQuestion = () => {
    console.log('Navigating to ask question screen...');
    navigation.navigate('AskQuestionScreen');
  };
  

  return (
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
      <View style={styles.customerServiceTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.customerServiceText}>고객센터</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="궁금한 점을 검색해보세요"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/qa_icon.png')}
        style={styles.qaIcon}
        resizeMode="contain"
      />
      <View style={styles.listView}>
        <Text style={styles.listTitle}>데이터 출력</Text>
        {data.map((item)=>(
          <View key={item.id}>
            <Text>Title: {item.title}</Text>
            <Text>Content: {item.cotent}</Text>
            <Text>ID: {item.user_id}</Text>
          </View>

        )
      )}
        <Text></Text>
      </View>
      <ScrollView style={styles.questionContainer}>
        {questions.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleQuestionPress(index)}
            style={styles.questionItem}
          >
            <View style={styles.questionHeader}>
              <Text>{data.title}</Text>
              <Text style={styles.dateText}>{data.user_id}</Text>
              <Text>{expandedIndex === index ? '🔽' : '▶️'}</Text>
            </View>
            {expandedIndex === index && (
              <Text style={styles.questionDetail}>
                {data.content}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.askButton}
        onPress={() => navigation.navigate('QnA')}
      >
        <Text style={styles.askButtonText}>문의 남기기</Text>
      </TouchableOpacity>
      <View style={styles.versionInfoContainer}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#508BFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  qaIcon: {
    alignSelf: 'center',
    flex: 1, 
    marginBottom: 10,
  },
  questionContainer: {
    flex: 1,
    marginTop: 10,
  },
  questionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: '#818181',
    fontSize: 12,
  },
  questionDetail: {
    marginTop: 10,
    color: '#818181',
  },
  askButton: {
    backgroundColor: '#508BFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
    width: 120,
  },
  askButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
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
  customerServiceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerServiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
    flex: 1,
    textAlign:'center',
  },
  backButton: {
    marginRight: 10,
  },
});

export default CustomerServiceScreen;
