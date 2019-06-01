import React from 'react';
import { ListItem, Text, CheckBox, Body, Button, Icon } from 'native-base';

export default class ToDoItem extends React.Component {
  render() {

    const { todo, deleteTodo, updateTodo } = this.props;

    return (
      <ListItem>
        <CheckBox
          checked={todo.completed}
          onPress={() => {return updateTodo(todo)}}
        />
        <Body>
          <Text>{todo.task}</Text>
        </Body>
        <Button
          transparent
          onPress={() => {deleteTodo(todo)}}
        >
            <Icon name = { 'trash' } type="Entypo" />                
        </Button>
      </ListItem>
    );
  }
}