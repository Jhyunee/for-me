import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { BarChart } from "react-native-gifted-charts";
import HorizontalLine from '../components/HorizontalLine';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MenuBar from '../components/MenuBar';




const StatScreen = () => {
  const navigation = useNavigation();
  // 선택된 기간을 위한 상태 변수 정의
  const [selectedStatPeriod, setSelectedStatPeriod] = useState('yy');
  const [selectedCategoryPeriod, setSelectedCategoryPeriod] = useState('yy');

  const [resAchieve, setResAchieve] = useState([]);
  const [resCategory, setResCategory] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  // 선택된 기간 변경을 처리하는 핸들러 함수
  const handleStatPeriodChange = (period) => {
    setSelectedStatPeriod(period);
  };

  const handleCategoryPeriodChange = (period) => {
    setSelectedCategoryPeriod(period);
  };

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

  // 렌더링이 안되면 쓸 데이터
  const data = {
    year: [
      { value: 5, label: "'19" },
      { value: 6, label: "'20" },
      { value: 7, label: "'21" },
      { value: 8, label: "'22" },
      { value: 9, label: "'23" },
      { value: 2, label: "'24" },
    ],
    month: [
      { value: 4, label: "Jan" },
      { value: 5, label: "Feb" },
      { value: 6, label: "Mar" },
      { value: 6, label: "6주차" },
    ],
  }

  // Axios 요청을 수정하여 선택된 기간을 사용하도록 업데이트합니다.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');;
        // 기존 코드와 동일하게 작성하되, selectedStatPeriod와 selectedCategoryPeriod를 사용하여 요청을 보냅니다.
        const response = await axios.get('http://172.16.11.224:8080/api/statics/checklist', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken
          },
          params: {
            selectedStatPeriod,
            selectedCategoryPeriod
          }
        });
        // 받은 데이터를 처리합니다.
        if (response.status === 200) {
          //console.log(response.data);
        setResAchieve(response.data.achieve ?? []);
        setResCategory(response.data.category ?? []);
      } else {
          // 인증 실패 또는 기타 오류
          let errorMessage = '알 수 없는 오류가 발생했습니다.';
          if (response.status === 401) {
              errorMessage = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
          } else if (response.status === 500) {
              errorMessage = '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.';
          }
          Alert.alert('Error', errorMessage);
      }
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
    
  }, [selectedStatPeriod, selectedCategoryPeriod]); // 기간이 변경될 때마다 useEffect가 실행됩니다.
 

  const categories = ["건강", "일상", "공부", "취미", "돈관리"];
  const categoryColors = ['#6A9DFF', '#97BAFF', '#B9D0FF', '#CDCDCD', '#B2B2B2'];
  const categoryData = [];
  const statData = [];


  
   categories.forEach(category => {
     // responseData에서 해당 카테고리를 찾습니다.
     const found = resCategory.find(item => item.category === category);
     // responseData에서 찾은 경우 count 값을 사용하고, 없는 경우 count 값을 0으로 설정합니다.
     categoryData.push({ category, count: found ? found.category_count : 0 });
   });
  /*
  resCategory.forEach(item => {
    categoryData.push({category: item.category, category_count: item.category_count})
  })
    */

  resAchieve.forEach(item => {
    statData.push({ ymd: item.ymd, rate: item.rate });
  });
  const transformedData = categoryData.map(item => ({
    value: item.count,
    label: item.category
  }),
);
  
  //console.log(transformedData);
 // console.log(transformedData.length);

  //console.log(categoryData);
  //[{"category": "건강", "count": 0}, {"category": "일상", "count": 0}, {"category": "공부", "count": 0}, {"category": "취미", "count": 0}, {"category": "돈관리", "count": 0}]
 // console.log(statData);
  //[{"rate": 0.0139, "ymd": 2024}]



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
      <View style={styles.achievementRate}>
        <Text style={styles.subtitle}>체크리스트 달성율 통계</Text>
        <View style={styles.graphPeriodButtons}>
            <TouchableOpacity
              style={[styles.periodButton, selectedStatPeriod === 'yy' && styles.selectedPeriodButton]}
              onPress={() => handleStatPeriodChange('yy')}
            >
              <Text style={styles.periodButtonText}>연간</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedStatPeriod === 'mm' && styles.selectedPeriodButton]}
              onPress={() => handleStatPeriodChange('mm')}
            >
              <Text style={styles.periodButtonText}>월간</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedStatPeriod === 'ww' && styles.selectedPeriodButton]}
              onPress={() => handleStatPeriodChange('ww')}
            >
              <Text style={styles.periodButtonText}>주간</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.chartBox}>
        {transformedData.length == 5 && <BarChart
            barMarginBottom={0} // x축 두께 늘리면 얘도 늘려줌;
          //  noOfSections={1} // 세로축 섹션
           barBorderRadius={4} // 모서리 둥글게
          frontColor="#508BFF" // bar 색상
            data={transformedData} //!! 렌더링 안된다면  data={data[selectedStatPeriod]} 사용
            yAxisThickness={0} // Y축 두께
           xAxisThickness={0} // X축 두께
         //   hideRules // 기준선 지우기
            //spacing={15}
         //   stepHeight={180}
            maxValue={10}
          />}
        </View>
      </View>
      <View style={styles.achievementCategory}>
      <Text style={styles.subtitle}>최다 달성 카테고리</Text>
      <View style={styles.categoryPeriodButtons}>
            <TouchableOpacity
              style={[styles.periodButton, selectedCategoryPeriod === 'yy' && styles.selectedPeriodButton]}
              onPress={() => handleCategoryPeriodChange('yy')}
            >
              <Text style={styles.periodButtonText}>연간</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedCategoryPeriod === 'mm' && styles.selectedPeriodButton]}
              onPress={() => handleCategoryPeriodChange('mm')}
            >
              <Text style={styles.periodButtonText}>월간</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedCategoryPeriod === 'ww' && styles.selectedPeriodButton]}
              onPress={() => handleCategoryPeriodChange('ww')}
            >
              <Text style={styles.periodButtonText}>주간</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer}>
        {categoryData.map((item, index) => (
          <View key={index} style={[styles.categoryItemContainer, { backgroundColor: categoryColors[index % categoryColors.length] }]}>
            <Text style={styles.categoryItem}>{`${index + 1} ${item.category}`}</Text>
            <Text style={styles.categoryCount}>{item.count}회</Text>
          </View>
        ))}
      </View>
        </View>
        <MenuBar onSelect={handleMenuSelect} />
    </SafeAreaView>
  );
};

export default StatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f7f8fa",
    position: 'relative',
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
  achievementRate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartBox: {
    width: 350,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#000000",
    paddingBottom: 30,
    marginLeft: 20,
    marginTop: 10
  },
  achievementCategory: {
  
  },
  categoryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 360,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 10,
    marginBottom: 4,
    alignContent: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    bottom: 20
  },
  categoryItem: {
    color: '#FFFFFF',
    fontWeight: "800",
    fontSize: 20,
    paddingLeft: 20,
    marginBottom: 8
  },
  categoryCount: {
    color: '#FFFFFF',
    fontWeight: "800",
    fontSize: 20,
    paddingLeft: 20,
    marginBottom: 8,
    marginRight: 20
  },
  subtitle: {
    color: "#343A40",
    fontWeight: "800",
    fontSize: 14,
    paddingLeft: 20,
    
  },
  menuBar: {
    height: 60,
    backgroundColor: "#508BFF",
    flexDirection: "row",
    justifyContent: "space-around",
    position: 'absolute',
    bottom: 0, // 화면 하단에 고정
    left: 0, // 왼쪽 정렬
    right: 0, // 오른쪽 정렬 
    // flex: 1
  },
  menuIcon: {
    margin: 10,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  achievementRate: {
    marginBottom: 20,
  },
  graphPeriodButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
    bottom: 19
  },
  categoryPeriodButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    paddingRight: 15,
    bottom: 19
  },
  periodButton: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "#D1D1D1",
  },
  selectedPeriodButton: {
    backgroundColor: "#508BFF",
  },
  periodButtonText: {
    color: "#D1D1D1",
    fontSize: 12,
    fontWeight: "800"
  },
  achievementCategory: {
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 10,
  }
});
