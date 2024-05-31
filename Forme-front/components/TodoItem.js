import { Pressable, StyleSheet, Text, TextInput, View, Alert, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Checkbox from '../assets/checkbox.svg'
import KebabMenu from '../assets/kebabmenu.svg'
import InputIcon from '../assets/input.svg'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'

const TodoItem = ({ todoItem, todoList, setTodoList, category }) => {
  const [ edited, setEdited ] = useState(false);
  const [ newTodo, setNewTodo] = useState(todoItem.todo);
  const editInputRef = useRef(null);
  const [ categoryLabel, setCategoryLabel ] = useState(null);

  const onClickEditButton = () => {
    setEdited(true);
  }

  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      // id 값이 같은 항목의 checked 값을 Toggle 함
      checked: item.id === todoItem.id ? !item.checked : item.checked,
    }));

    setTodoList(nextTodoList);
  };

  const onClickSubmitButton = () => {
    const nextTodoList = todoList.map((item) => ({
     ...item,
      todo: item.id === todoItem.id ? newTodo : item.todo, // 새로운 아이템 내용을 넣어줌
    }));
    setTodoList(nextTodoList); // 새로운 리스트를 넣어줌
    setEdited(false); // 수정모드를 다시 읽기 모드로 변경
  };

  const onClickDeleteButton = () => {
    Alert.alert(
      '삭제 확인',
      '정말로 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel'
        },
        {
          text: '삭제',
          onPress: () => {
            const nextTodoList = todoList.filter((item) => item.id !== todoItem.id);
            setTodoList(nextTodoList);
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    )
  };

  useEffect(() => {
    if (edited && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const Divider = () => <View style={styles.divider} />;

  return (
    <View style={[styles.itemContainer, todoItem.checked && styles.checkedItemContainer]}>
      <Pressable style={styles.itemCheckbox} onPress={onChangeCheckbox} hitSlop={10}>
      <Checkbox />
      </Pressable>
      {edited ? (
        <View style={styles.editInputContainer}>
          <TextInput
            style={styles.editInput}
            value={newTodo}
            onChangeText={setNewTodo}
            ref={editInputRef}
          />
        </View>
      ) : (
        <Text style={[styles.itemText, todoItem.checked && styles.checkedItemText]}>
          {todoItem.todo}
        </Text>
      )}      
      <Menu>
        <MenuTrigger>
          {edited ? (
            <TouchableOpacity 
              onPress={onClickSubmitButton} 
              style={[styles.submitButtonContainer, styles.submitButton]}
              hitSlop={5}
            >
              <InputIcon />
            </TouchableOpacity>
          ) : (
            <KebabMenu />
          )}  
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.optionStyle}>
          <View style={styles.edit}>
          <MenuOption onSelect={onClickEditButton}>
            <Text>수정하기</Text>
          </MenuOption>
          </View>
          <Divider />
          <MenuOption style={styles.delete} onSelect={onClickDeleteButton}>
            <Text>삭제하기</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      {categoryLabel && <Text>{categoryLabel}</Text>} 
    </View>

  )
}

{/* <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
      }} 
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>수정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>삭제하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
          </View>
        </View>
    </Modal> */}

export default TodoItem

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#DEE2E6', // 회색 바탕
    borderRadius: 10, // 모서리 둥글
    padding: 10, // 안쪽 여백
    alignItems: 'center', // 수직 중앙 정령, 왜?
    justifyContent: 'space-between', // 수평 정렬 및 간격 분배
    marginVertical: 5, // 상하 여백
    marginHorizontal: 50 // 좌우 여백
  },
  itemCheckbox: {
    marginRight: 10 // 체크박스와 Todo 항목 사이 간격
  },
  itemText: {
    flex: 1, // Todo 항목이 가능한 큰 공간을 차지하도록
  },
  checkedItemContainer: {
    backgroundColor: 'transparent',
    marginVertical: -4
  },
  checkedItemText: {
    textDecorationLine: 'line-through', // Todo 항목이 체크된 상태라면 취소선
    color: '#999999'
  },
  editInput: {
    flex: 1,
    marginRight: 80
  },
  submitButtonContainer: {
    right: 70,
    marginBottom: 3,
    paddingBottom: 4,
    paddingHorizontal: 4,
    borderRadius: 0
  },
  submitButton: {
    fontWeight: 'bold',
    color: 'white'
  },
  divider: {
    height: 1,
    backgroundColor: '#515151'
  },
  optionStyle: {
    width: '30%',
    borderRadius: 7
  },
  editInputContainer: {
    flexDirection: 'row'
  }
})