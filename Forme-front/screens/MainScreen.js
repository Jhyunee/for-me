import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, TextInput, Alert, Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
    const navigation = useNavigation()

    // const [hello, setData] = useState("");
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    // HTTP 요청을 보내는 함수
    async function httpRequest(method, url, body) {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 액세스 토큰 값을 가져옴

            const response = await fetch(url, {
                method: method,
                headers: {
                    Authorization: 'Bearer ' + accessToken, // 헤더에 액세스 토큰 추가
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (response.ok) {
                Alert.alert("등록에 성공하였습니다.");
            }

            else if (response.status === 401) {
                const refreshToken = await AsyncStorage.getItem('refreshToken'); // AsyncStorage에서 리프레시 토큰 값을 가져옴

                if (refreshToken) {
                    const refreshResponse = await fetch('http://192.168.0.6:8080/api/token', {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + accessToken, 
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            refreshToken: refreshToken,
                        }),
                    });

                    if (refreshResponse.ok) {
                        const result = await refreshResponse.json();
                        await AsyncStorage.setItem('accessToken', result.accessToken); // 새로운 액세스 토큰을 AsyncStorage에 저장
                        return httpRequest(method, url, body, success, fail);
                    }
                }
            }
            else return Alert.alert("401 등록에 실패하였습니다.");

        } catch (error) {
            console.error('Error:', error);
            return Alert.alert("등록에 실패하였습니다.");
        }
    }
    

    const handleSubmit = async() => {
        httpRequest('POST', 'http://192.168.0.6:8080/api/mypage/services', JSON.stringify({title : title, content: content,}));
    }



    // const handleSubmit = async() => {
    //     try {
    //         const response = await fetch('http://10.0.2.2:8080/api/mypage/services', {
    //             method: 'POST',
    //             headers : {
    //                 Authorization: "Bearer " + AsyncStorage.getItem("accessToken"),
    //                 'Content-Type': 'application/json',
    //             },
    //             body : JSON.stringify({
    //                 title : title,
    //                 content : content,
    //             }),
    //         });
    //         // if(response.ok) {
    //         //     Alert.alert('Success', 'Data successfully submitted!');
    //         // } else {
    //         //     Alert.alert('Error', 'Failed to submit data. Please try again later.');
    //         // }
    //     } catch (error) {
    //         console.error('Error submitting data:', error);
    //         // Alert.alert('Error', 'Failed to submit data. Please try again later.');
    //     }
    // };

    // const getDatas = async () => {
    //     try {
    //         const response = await fetch('http://10.0.2.2:8080/api/hello');
    //         const text = await response.text();
    //         setData(text);
    //     } catch (error) {
    //         consol.error(error);
    //     } 
    // }

    // useEffect(() => {
    //     getDatas();
    // }, []);


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'default'}/>
        <Text style={styles.pageTitle}>For Me</Text>
        <Button title="로그인 화면" onPress={() => navigation.navigate('Home')} />
        <View style={styles.separator} />
        <View style={styles.listView}>
            <Text style={styles.listTitle}>글쓰고 아이디 저장까지 테스트</Text>
            <View style={{padding: 20}}>
                <TextInput
                    placeholder="Title"
                    onChangeText={text => setTitle(text)}
                    value={title}
                    style={{ marginBottom: 10, borderWidth: 1, padding: 5 }}
                />
                <TextInput
                    placeholder="Content"
                    onChangeText={text => setContent(text)}
                    value={content}
                    style={{ marginBottom: 10, borderWidth: 1, padding: 5 }}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>테스트</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.listView}>
            <Text style={styles.listTitle}>으아앙</Text>
        </View>
        <View style={styles.listView}>
            <Text style={styles.listTitle}>완료됨</Text>
        </View>
        <View style={styles.menuBar} />
    </SafeAreaView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa'
    },
    pageTitle: {
        marginTop: 20,
        marginBottom: 5,
        paddingHorizontal: 15,
        fontSize: 35,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#508BFF',
        textAlign: 'center'
    },
    separator: {
        marginHorizontal: 100,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    listView: {
        flex: 1
    },
    listTitle: {
        marginBottom: 25,
        paddingHorizontal: 15,
        fontSize: 14,
        fontWeight: 'bold',
        flex: 0
    },
    menuBar: {
        height: 60,
        backgroundColor: '#508BFF'
    },
    button: {
        backgroundColor: '#508BFF',
        width: '130%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: '900',
        fontSize: 14,
        color: 'white'
    }

})
