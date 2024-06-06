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
import MenuBar from '../components/MenuBar';

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

    const handleMenuSelect = (selection) => {
        console.log('Menu selected:', selection);
        // Navigate to the selected screen
        navigation.navigate(selection);
      };
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
            <MenuBar onSelect={handleMenuSelect} />
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
