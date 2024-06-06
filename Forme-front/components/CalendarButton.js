import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SvgXml } from 'react-native-svg';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarButton = ({  select_Date,selectedDate, onDateChange, setTodoList, setTodoData, setCategories }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [doneList, setDoneList] = useState([]);
  const [notDoneList, setNotDoneList] = useState([]);

  const RightIcon = `
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#515151"/>
  </svg>
  `;

  const LeftIcon = `
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#515151"/>
  </svg>
  `;

  const handleDateSelect = async (day) => {
    onDateChange(day.dateString);
    setShowCalendar(false); // 날짜를 선택하면 모달을 닫습니다.
    try {
      const selectedDate = day.dateString
      const select_date = selectedDate;
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await axios.get('http://172.16.11.224:8080/api/home', {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Refresh-Token': refreshToken
          },
          params: {
              select_date
          }
      });
      console.log(response.data);
      console.log(select_date);
      setTodoData(response.data);
      // const todos = Array.from(response.data.notDone, item => item.name);
      const uniqueCategories = [...new Set(response.data.notDone.map(item => item.category))]
      setCategories(uniqueCategories);
  } catch (error) {
      console.error('Error', error);
  }
  };

  const goToToday = async () => {
    onDateChange(null); // 선택한 날짜 초기화하여 현재 날짜로 되돌아갑니다.
    setCurrentDate(new Date()); // 현재 날짜 업데이트
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0'); 
    const formattedDate = `${year}-${month}-${date}`;
    setTodoList([]);
    try {
      const selectedDate = formattedDate
      const select_date = selectedDate;
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await axios.get('http://172.16.11.224:8080/api/home', {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Refresh-Token': refreshToken
          },
          params: {
              select_date
          }
      });
      console.log(select_date);
      setTodoData(response.data);
      // const todos = Array.from(response.data.notDone, item => item.name);
      const uniqueCategories = [...new Set(response.data.notDone.map(item => item.category))]
      setCategories(uniqueCategories);
  } catch (error) {
      console.error('Error', error);
  } 
  };

  const goToPreviousDay = async() => {
    const previousDate = new Date(selectedDate || currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    onDateChange(previousDate.toISOString().split('T')[0]);
    setTodoList([]);
    try {
      const selectedDate = previousDate.toISOString().split('T')[0];
      const select_date = selectedDate;
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await axios.get('http://172.16.11.224:8080/api/home', {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Refresh-Token': refreshToken
          },
          params: {
              select_date
          }
      });
      console.log(select_date);
      setTodoData(response.data);
      // const todos = Array.from(response.data.notDone, item => item.name);
      const uniqueCategories = [...new Set(response.data.notDone.map(item => item.category))]
      setCategories(uniqueCategories);
  } catch (error) {
      console.error('Error', error);
  } 
  };
  
  const goToNextDay = async () => {
    const nextDate = new Date(selectedDate || currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onDateChange(nextDate.toISOString().split('T')[0]);
    setTodoList([]);
    try {
      const selectedDate = nextDate.toISOString().split('T')[0];
      const select_date = selectedDate;
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await axios.get('http://172.16.11.224:8080/api/home', {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Refresh-Token': refreshToken
          },
          params: {
              select_date
          }
      });
      console.log(select_date);
      setTodoData(response.data);
      // const todos = Array.from(response.data.notDone, item => item.name);
      const uniqueCategories = [...new Set(response.data.notDone.map(item => item.category))]
      setCategories(uniqueCategories);
  } catch (error) {
      console.error('Error', error);
  } 
  };

  const formatCurrentDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.calendarContainer}>
      <Modal
        visible={showCalendar}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={(day) => handleDateSelect(day)}
              markedDates={{ [selectedDate]: { selected: true, marked: true } }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
        <Text style={styles.todayText}>Today</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={goToPreviousDay}>
      <SvgXml xml={LeftIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setShowCalendar(true)}>
        <Text style={styles.buttonText}>
          {selectedDate ? formatCurrentDate(new Date(selectedDate)) : formatCurrentDate(currentDate)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToNextDay}>
      <SvgXml xml={RightIcon} />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: { 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  todayButton: {
    paddingVertical: 12
  },
  todayText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: '#515151',
  },
  buttonText: {
    fontSize: 14,
    color: '#515151',
    fontFamily: 'Pretendard-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center'
  }
});

export default CalendarButton;
