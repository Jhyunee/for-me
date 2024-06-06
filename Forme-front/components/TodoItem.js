import { Pressable, StyleSheet, Text, TextInput, View, Alert, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { SvgXml } from 'react-native-svg';

const TodoItem = ({ todoItem, todoList, setTodoList, category }) => {
  const [ edited, setEdited ] = useState(false);
  const [ newTodo, setNewTodo] = useState(todoItem.todo);
  const editInputRef = useRef(null);
  const [ categoryLabel, setCategoryLabel ] = useState(null);

  const Checkbox = `
  <svg width="30px" height="30px" viewBox="0 0 24 24" fill='white' xmlns="http://www.w3.org/2000/svg">
  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  const InputIcon = `
  <svg width="27px" height="27px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-plus-square" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11ZM3 0H21C22.6569 0 24 1.34315 24 3V21C24 22.6569 22.6569 24 21 24H3C1.34315 24 0 22.6569 0 21V3C0 1.34315 1.34315 0 3 0ZM3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3Z" fill="#000000"/></svg>
  `;

  const KebabMenu = `
  <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Kebab-Menu</title>
  <g id="Kebab-Menu" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
  <rect id="Container" x="0" y="0" width="24" height="24">
  </rect>
  <path d="M12,6 C12.5522847,6 13,5.55228475 13,5 C13,4.44771525 12.5522847,4 12,4 C11.4477153,4 11,4.44771525 11,5 C11,5.55228475 11.4477153,6 12,6 Z" id="shape-03" stroke="#030819" stroke-width="2" stroke-linecap="round" stroke-dasharray="0,0">
  </path>
  <path d="M12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 Z" id="shape-03" stroke="#030819" stroke-width="2" stroke-linecap="round" stroke-dasharray="0,0">
  </path>
  <path d="M12,20 C12.5522847,20 13,19.5522847 13,19 C13,18.4477153 12.5522847,18 12,18 C11.4477153,18 11,18.4477153 11,19 C11,19.5522847 11.4477153,20 12,20 Z" id="shape-03" stroke="#030819" stroke-width="2" stroke-linecap="round" stroke-dasharray="0,0">
  </path>
  </g>
  </svg>
  `;

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
      <SvgXml xml={Checkbox} width={15} height={15} />
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
          {todoItem.name}
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
              <SvgXml xml={InputIcon} />
            </TouchableOpacity>
          ) : (
            <SvgXml xml={KebabMenu} />
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
    borderRadius: 5,
    padding: 10, // 안쪽 여백
    alignItems: 'center', // 수직 중앙 정령, 왜?
    justifyContent: 'space-between', // 수평 정렬 및 간격 분배
    marginVertical: 5, // 상하 여백
  },
  itemCheckbox: {
    marginRight: 10, // 체크박스와 Todo 항목 사이 간격
  },
  itemText: {
    flex: 1, // Todo 항목이 가능한 큰 공간을 차지하도록
    fontFamily: 'Pretendard-Regular',
  },
  checkedItemContainer: {
    backgroundColor: 'transparent',
    marginVertical: -4,
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