import { Button, Modal, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import settingsIcon from '../assets/settings.png';
import notionIcon from '../assets/notion.png';
import fireIcon from '../assets/fire.png';
import { Path, Svg } from 'react-native-svg';
import CalendarButton from '../components/CalendarButton';
import TodoItemList from '../components/TodoItemList';
import HomeOn from '../assets/home_on';
import Stat from '../assets/stat_off.svg';
import Comm from '../assets/comm_off';
import UserOff from '../assets/user_off';


const MainScreen = () => {
    const [ todoList, setTodoList ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ todo, setTodo ] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const inputRef = useRef(null);
    const navigation = useNavigation();

    const onTodoInput = (newTodo) => {
        setTodo(newTodo);
    };

    const onPressAdd = () => {
        if (todo.trim() === ''){ // 입력값이 없으면 아무 동작도 하지 않음
            return;
        }

        const NewTodoList = [...todoList, { id: todoList.length, todo, checked: false, delete: false }];
        setTodoList(NewTodoList);

        setTodo(''); // 입력값 초기화
        if(inputRef.current){
        inputRef.current.clear(); // 입력창 내용 비우기
        inputRef.current.focus();
    }
        setModalVisible(false);
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

    useEffect(() => {
        if (!modalVisible) {
            handleModalClose();
        }
    }, [modalVisible]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'default'}/>
            <View style={styles.header}>
                <View style={styles.leftSettings}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={settingsIcon} style={styles.settings} />
                </TouchableOpacity>
                </View>
                <View style={styles.rightSettings}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={notionIcon} style={styles.settings} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={fireIcon} style={styles.settings} />
                </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.pageTitle}>For Me</Text>
            <CalendarButton setTodoList={setTodoList} />
            <Text style={styles.subTitle}>매일 실천 체크리스트</Text>
            <View style={styles.listView}>
                
                
                <TodoItemList 
                    title={'카테고리 들어가야 하는데...'}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    checkedList={false}
                    selectedDate={selectedDate}
                />
                <TodoItemList 
                    title={'완료됨'}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    checkedList={true}
                    selectedDate={selectedDate}
                />
                
            </View>            
            <Modal
                animationType="fade"
                transparent={true} // true = 모달 열어도 뒤에 화면 보이게, false = 모달 열면 뒤에 화면 불투명하게
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableWithoutFeedback onPress={(closeModal)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>목표 이름</Text>
                                <TextInput
                                    style={styles.input}
                                    value={todo}
                                    ref={inputRef}
                                    onChangeText={onTodoInput}
                                    placeholder="목표 이름을 입력하세요"
                                />
                                <Button title="저장" onPress={onPressAdd} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Button title="로그인 화면" onPress={() => navigation.navigate('Home')} />
            <View style={styles.menuBar} >
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.menuIcon}>
                        <Comm />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={FillModeAndModal} style={styles.menuIcon}>
                        <Svg width="45" height="45" viewBox="-7 -5 50 50">
                            <Path 
                                d="M24.98 30.009h-23v-25h14.050l2.022-1.948-0.052-0.052h-16.020c-1.105 0-2 0.896-2 2v25c0 1.105 0.895 2 2 2h23c1.105 0 2-0.895 2-2v-14.646l-2 1.909v12.736zM30.445 1.295c-0.902-0.865-1.898-1.304-2.961-1.304-1.663 0-2.876 1.074-3.206 1.403-0.468 0.462-13.724 13.699-13.724 13.699-0.104 0.106-0.18 0.235-0.219 0.38-0.359 1.326-2.159 7.218-2.176 7.277-0.093 0.302-0.010 0.631 0.213 0.851 0.159 0.16 0.373 0.245 0.591 0.245 0.086 0 0.172-0.012 0.257-0.039 0.061-0.020 6.141-1.986 7.141-2.285 0.132-0.039 0.252-0.11 0.351-0.207 0.631-0.623 12.816-12.618 13.802-13.637 1.020-1.052 1.526-2.146 1.507-3.253-0.019-1.094-0.55-2.147-1.575-3.129zM29.076 6.285c-0.556 0.574-4.914 4.88-12.952 12.798l-0.615 0.607c-0.921 0.285-3.128 0.994-4.796 1.532 0.537-1.773 1.181-3.916 1.469-4.929 1.717-1.715 13.075-13.055 13.506-13.48 0.084-0.084 0.851-0.821 1.795-0.821 0.536 0 1.053 0.244 1.577 0.748 0.627 0.602 0.95 1.179 0.959 1.72 0.010 0.556-0.308 1.171-0.943 1.827z"
                                fill={isFilled ? 'white' : 'black'} // isFilled 상태에 따라 채우기/외곽선 설정
                                stroke={isFilled ? 'black' : 'white'} // isFilled 상태에 따라 외곽선/채우기 설정
                                strokeWidth="2"
                            /> 
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuIcon}>
                        <HomeOn />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Stat')}>
                        <Stat />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuIcon}>
                        <UserOff />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

{/* <Svg width="70" height="70" viewBox="-8 -1 45 45">
    Path 
        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
        fill={'none'}
        stroke={'white'}
        strokeWidth="2"
    /> 
    <Path
        d="M14.5 10.75C14.0858 10.75 13.75 10.4142 13.75 10C13.75 9.58579 14.0858 9.25 14.5 9.25H17C17.4142 9.25 17.75 9.58579 17.75 10V12.5C17.75 12.9142 17.4142 13.25 17 13.25C16.5858 13.25 16.25 12.9142 16.25 12.5V11.8107L14.2374 13.8232C13.554 14.5066 12.446 14.5066 11.7626 13.8232L10.1768 12.2374C10.0791 12.1398 9.92085 12.1398 9.82322 12.2374L7.53033 14.5303C7.23744 14.8232 6.76256 14.8232 6.46967 14.5303C6.17678 14.2374 6.17678 13.7626 6.46967 13.4697L8.76256 11.1768C9.44598 10.4934 10.554 10.4934 11.2374 11.1768L12.8232 12.7626C12.9209 12.8602 13.0791 12.8602 13.1768 12.7626L15.1893 10.75H14.5Z"
        fill={'white'}
        stroke={'none'}
    />
    </Svg> 통계 페이지에 적용시킬 아이콘 */}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        top: 15
    },
    pageTitle: {
        fontSize: 35,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#508BFF',
        textAlign: 'center',
        bottom: 20
    },
    leftSettings: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightSettings: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    settings: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    listView: {
         flex: 1,
         
    },
    listTitle: {
        marginBottom: 25,
        paddingHorizontal: 15,
        fontSize: 14,
        fontWeight: 'bold',
    },
    menuBar: {
        height: 60,
        backgroundColor: '#508BFF',
        flexDirection: 'row',
        justifyContent:'space-around',
        // flex: 1
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 20
    },
    subTitle: {
        color: '#343A40',
        fontWeight: '800',
        fontSize: 17,
        paddingLeft: 40,
        paddingTop: 15
    }
})
