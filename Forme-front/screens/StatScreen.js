import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { BarChart } from "react-native-gifted-charts";
import HorizontalLine from '../components/HorizontalLine';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';





const StatScreen = () => {
  const navigation = useNavigation();
  // 선택된 기간을 위한 상태 변수 정의
  const [selectedStatPeriod, setSelectedStatPeriod] = useState('yy');
  const [selectedCategoryPeriod, setSelectedCategoryPeriod] = useState('yy');

  const [resAchieve, setResAchieve] = useState([]);
  const [resCategory, setResCategory] = useState([]);

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
          console.log(response.data);
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
  }));
  
  console.log(transformedData);

  console.log(categoryData);
  //[{"category": "건강", "count": 0}, {"category": "일상", "count": 0}, {"category": "공부", "count": 0}, {"category": "취미", "count": 0}, {"category": "돈관리", "count": 0}]
  console.log(statData);
  //[{"rate": 0.0139, "ymd": 2024}]


   // svg 문제로 일단 하드코딩 해둠
   const HomeSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="#FFFFFF"/>
   </svg>
   `;
   const StatSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM13.75 10C13.75 10.4142 14.0858 10.75 14.5 10.75H15.1893L13.1768 12.7626C13.0791 12.8602 12.9209 12.8602 12.8232 12.7626L11.2374 11.1768C10.554 10.4934 9.44598 10.4934 8.76256 11.1768L6.46967 13.4697C6.17678 13.7626 6.17678 14.2374 6.46967 14.5303C6.76256 14.8232 7.23744 14.8232 7.53033 14.5303L9.82322 12.2374C9.92085 12.1398 10.0791 12.1398 10.1768 12.2374L11.7626 13.8232C12.446 14.5066 13.554 14.5066 14.2374 13.8232L16.25 11.8107V12.5C16.25 12.9142 16.5858 13.25 17 13.25C17.4142 13.25 17.75 12.9142 17.75 12.5V10C17.75 9.58579 17.4142 9.25 17 9.25H14.5C14.0858 9.25 13.75 9.58579 13.75 10Z" fill="#FFFFFF"/>
 </svg>
   `;
   const CommSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#FFFFFF"/>
 </svg>
   `;
 
   const UserSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#FFFFFF"/>
 </svg>
   `;
 
   const WriteSvg = `
   <svg fill="#FFFFFF" width="37px" height="37px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>note-edit-solid</title>
     <path d="M33,6.4,29.3,2.7a1.71,1.71,0,0,0-2.36,0L23.65,6H6A2,2,0,0,0,4,8V30a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V11.76l3-3A1.67,1.67,0,0,0,33,6.4ZM18.83,20.13l-4.19.93,1-4.15,9.55-9.57,3.23,3.23ZM29.5,9.43,26.27,6.2l1.85-1.85,3.23,3.23Z" class="clr-i-solid clr-i-solid-path-1"></path>
     <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
 </svg>
   `;



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
        {transformedData.length > 3 && <BarChart
            barMarginBottom={0} // x축 두께 늘리면 얘도 늘려줌;
          //  noOfSections={1} // 세로축 섹션
           barBorderRadius={4} // 모서리 둥글게
          frontColor="#508BFF" // bar 색상
            data={transformedData}
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
        <View style={styles.menuBar}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('MainT')}>
          <SvgXml xml={HomeSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Stat')}>
          <SvgXml xml={StatSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Community')}>
          <SvgXml xml={CommSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('MyPage')}>
          <SvgXml xml={UserSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon}  onPress={() => navigation.navigate('MainT')}>
          <SvgXml xml={WriteSvg} />
          </TouchableOpacity>
        </View>
      </View>
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
