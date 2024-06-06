import { LogBox, Alert, Modal, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SvgXml } from 'react-native-svg';
import CalendarButton from '../components/CalendarButton';
import TodoItem from '../components/TodoItem';
import TodoItemList from '../components/TodoItemList';
import HorizontalLine from '../components/HorizontalLine';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

LogBox.ignoreAllLogs();//오류 무시

const MainScreen_test = () => {
    const [todoData, setTodoData] = useState({ done: [], notDone: [] });
    const [ todoList, setTodoList ] = useState([]);
    const [newTodo, setNewTodo] =useState('');
    const [userId, setUserId] = useState('');
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ todo, setTodo ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState(null);
    const inputRef = useRef(null);
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [fontsLoaded] = useFonts({
        'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
        'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
        'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.ttf')
      });
      if (!fontsLoaded) {
        return <StatusBar />;
      }

    const onTodoInput = (newTodo) => {
        setTodo(newTodo);
    };

    const onPressAdd = async () => {
        const data = {
            name:newTodo,
            user_id: userId
          }

        if (!newTodo.trim()) {
            Alert.alert('내용 필수', '목표를 입력해주세요.');
            setModalVisible(false);
            return;
        }

        try {
            //console.log('Sending request with:', { newTodo,userId });
            const accessToken = await AsyncStorage.getItem('accessToken');
            const refreshToken = await AsyncStorage.getItem('refreshToken');

            Alert.alert('카테고리 자동 선정 중', '작업에 시간이 조금 걸립니다. 10초 뒤에 다시 메인 화면을 확인해주세요!');
            setModalVisible(false);
      
            const response = await axios.post('http://172.16.11.224:8080/api/checklists', data, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Refresh-Token': refreshToken
              }
            });
      
            if (response.status === 201) {
              console.log(response.data);
            } else {
              console.log('error', response);
            }
          } catch (err) {
            console.error('Network error:', err);
            Alert.alert('네트워크 오류', '네트워크 연결에 문제가 있습니다. 다시 시도해주세요.');
          }

        
        setNewTodo(''); // 입력값 초기화
        if(inputRef.current){
        inputRef.current.clear(); // 입력창 내용 비우기
        inputRef.current.focus();
    }
        setModalVisible(false);
        setIsFilled(false); // 이미지 상태 초기화
    };

    const [completedVisible, setCompletedVisible] = useState(true);
    const toggleCompletedVisible = () => {
        setCompletedVisible(!completedVisible);
    };
    
    const [ isFilled, setIsFilled ] = useState(false);

    const FillModeAndModal = () => {
        if(modalVisible) {
            setIsFilled(false);
            setModalVisible(false);
        } else {
            setIsFilled(!isFilled);
            setModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setIsFilled(false);
    };
    
    const closeModal = () => {
        setTodo('');
        setModalVisible(false);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    useEffect(() => {
        if (!modalVisible) {
            handleModalClose();
        }

        const fetchData = async () => {
            try {
                const selectedDate = new Date().toISOString().split('T')[0];
                const select_date = selectedDate;
                console.log(select_date);
                const accessToken = await AsyncStorage.getItem('accessToken');
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                const decodedToken = jwtDecode(accessToken);
                setUserId(decodedToken.sub);
                const response = await axios.get('http://172.16.11.224:8080/api/home', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Refresh-Token': refreshToken
                    },
                    params: {
                        select_date
                    }
                });
                // console.log(response.data);
                setTodoData(response.data);
                const todos = Array.from(response.data.notDone, item => item.name);
                console.log(response.data.notDone);
                const uniqueCategories = [...new Set(response.data.notDone.map(item => item.category))]
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchData();
    }, [modalVisible]);


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

   const InputIcon = `
   <svg width="27px" height="27px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-plus-square" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11ZM3 0H21C22.6569 0 24 1.34315 24 3V21C24 22.6569 22.6569 24 21 24H3C1.34315 24 0 22.6569 0 21V3C0 1.34315 1.34315 0 3 0ZM3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3Z" fill="#000000"/></svg>
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
            <View style={styles.contentContainer}>
            <CalendarButton
            selectedDate={selectedDate}
            onDateChange={handleDateChange} 
            setTodoList={setTodoList} 
            setTodoData={setTodoData}
            setCategories={setCategories}/>
            <Text style={styles.subTitle}>매일 실천 체크리스트</Text>
            <View style={styles.listView}>   
            {categories.map(category => (
                <View style={styles.listWrapper}>
                    <TodoItemList 
                key={category} // 카테고리로 구분
                title={category}
                todoList={todoData.notDone.filter(item => item.category === category)}
                completedVisible={true}
                 />
                </View>

            ))}
            <View style={styles.listWrapper}>
            <TodoItemList  
                    title={'완료됨'}
                    todoList={todoData.done}
                    // selectedDate={selectedDate}
                    completedVisible={true}
                    toggleCompletedVisible={toggleCompletedVisible}
            />
            </View>
            </View>
                     
            </View>
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>목표 설정</Text>
                            <View style={styles.modalInput}>
                            <TextInput
                            style={styles.input}
                            value={newTodo}
                            ref={inputRef}
                            onChangeText={text => setNewTodo(text)}
                            placeholder="목표 이름을 입력하세요"
                        />
                           <SvgXml xml={InputIcon} onPress={onPressAdd} />
                          </View>
                     </View>
                        </TouchableWithoutFeedback>
                    </View>
                 </TouchableWithoutFeedback>
            </Modal>
        <View style={styles.menuBar}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Main')}>
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
          <TouchableOpacity style={styles.menuIcon} onPress={FillModeAndModal}>
          <SvgXml xml={WriteSvg} />
          </TouchableOpacity>
        </View>
      </View>
        </SafeAreaView>
    )
}

export default MainScreen_test

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa',
        alignItems: 'center',
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
    listView: {
        height:'100%',
    },
    listWrapper: {
        flex: 1,
    },
    listTitle: {
        paddingHorizontal: 15,
        fontSize: 14,
        fontWeight: 'bold',
        
    },
    contentContainer:{
        width: '80%',
        height: '80%'
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
    menuIcon: {
        margin: 10
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#508BFF'
    },
    modalContainer: { // modal 창 열렸을 때 화면
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)' 
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Pretendard-Bold'
    },
    modalInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginRight: 20
    },
    subTitle: {
        color: '#343A40',
        alignContent:'flex-start',
        fontSize: 17,
        paddingTop: 15,
        fontFamily: 'Pretendard-Bold'
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
