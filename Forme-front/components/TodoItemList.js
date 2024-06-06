import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TodoItem from './TodoItem'
import { SvgXml } from 'react-native-svg';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'

const TodoItemList = ({ title, todoList, category, setTodoList, checkedList, selectedDate, completedVisible, toggleCompletedVisible }) => {
  const Fold = `
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#515151"/>
  </svg>
  `;

  const UnFold = `
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 10L12 15L17 10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return (
    <MenuProvider>
          <View>
      <View style={styles.titleContainer}>
        {checkedList && <TouchableOpacity onPress={toggleCompletedVisible} style={styles.icon}>
          {completedVisible ? <SvgXml xml={Fold} width={20} height={20} /> : <SvgXml xml={UnFold} width={20} height={20} />}
          </TouchableOpacity>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.todoCount}>  |  {todoList.filter(todoItem => !todoItem.deleted && checkedList === todoItem.checked).length}</Text>
      </View>
      {(
      <View style={styles.listContainer}>
        <FlatList
          data={todoList.filter(todoItem => 
            !todoItem.deleted && 
            checkedList === todoItem.checked &&
            (selectedDate ? todoItem.date === selectedDate : true)
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
         <TodoItem todoItem={item} todoList={todoList} setTodoList={setTodoList} />
          )}
        />
      </View>
      )}
    </View>
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    width:'100%',
    marginTop:5,
    paddingTop:10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  listContainer:{
    width:'100%',
  },
  todoCount: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Pretendard-Regular'
  },
  title: {
    color: '#343A40',
    fontFamily: 'Pretendard-Bold'
  },
  icon: {
    marginRight: 6
  },
})

export default TodoItemList

