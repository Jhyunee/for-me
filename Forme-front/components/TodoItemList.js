import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TodoItem from './TodoItem'
import Fold from '../assets/right.svg'
import Unfold from '../assets/down.svg'

const TodoItemList = ({ title, todoList, setTodoList, checkedList, selectedDate, completedVisible, toggleCompletedVisible }) => {

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {checkedList && <TouchableOpacity onPress={toggleCompletedVisible} style={styles.icon}>
          {completedVisible ? <Fold width={30} height={30}/> : <Unfold width={30} height={30}/>}
          </TouchableOpacity>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.todoCount}>  |  {todoList.filter(todoItem => !todoItem.deleted && checkedList === todoItem.checked).length}</Text>
      </View>
      {completedVisible && (
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
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginHorizontal: 60,
    paddingTop: 25,
    paddingBottom: 5,
    alignItems: 'center'
  },
  todoCount: {
    fontSize: 16,
    color: '#666', // 예시로 회색으로 표시
  },
  title: {
    color: '#343A40',
    fontWeight: 'bold'
  },
  icon: {
    marginRight: 8
  }
})

export default TodoItemList

