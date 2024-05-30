import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RightIcon from '../assets/right.svg';
import LeftIcon from '../assets/left.svg';

const CalendarButton = ({ setTodoList }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false); // 날짜를 선택하면 모달을 닫습니다.
    setTodoList([]);
  };

  const goToToday = () => {
    setSelectedDate(null); // 선택한 날짜 초기화하여 현재 날짜로 되돌아갑니다.
    setCurrentDate(new Date()); // 현재 날짜 업데이트
    setTodoList([]);
  };

  const goToPreviousDay = () => {
    const previousDate = new Date(selectedDate || currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    setSelectedDate(previousDate.toISOString().split('T')[0]);
    setTodoList([]);
  };
  
  const goToNextDay = () => {
    const nextDate = new Date(selectedDate || currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate.toISOString().split('T')[0]);
    setTodoList([]);
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
        <LeftIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setShowCalendar(true)}>
        <Text style={styles.buttonText}>
          {selectedDate ? formatCurrentDate(new Date(selectedDate)) : formatCurrentDate(currentDate)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToNextDay}>
        <RightIcon />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontSize: 18,
    color: '#515151',
    fontWeight: '800'
  },
  buttonText: {
    fontSize: 14,
    color: '#515151',
    fontWeight: '500'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center'
  }
});

export default CalendarButton;
