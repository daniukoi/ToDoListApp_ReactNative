import React from 'react';
import { Container, Header, Title, Content, Body, Text, Icon } from 'native-base';

import NewToDo from '../components/new_todo';
import AddToDoButton from '../components/add_todo_button';
import ToDoItem from "../components/todo_item";
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, getAll } from "../store/reducers/todo_reducer";
import {loadTasks} from "../store/reducers/todo_reducer";

class ToDoAll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      new_todo: false,
    };
  }

  componentDidMount(){
    this.props.loadTasks();
  }

  saveToDoData = (todo) => {
    this.addNewToDo(show = false);
    this.props.addTodo(todo);
  }

  addNewToDo = (show) => {
    this.setState({
      new_todo: show
    });
  }

  screenFilterTodos = () => {
    const { screen, todos } = this.props;
    if (screen == "Active") {
      return todos.filter(function (todo) {
        return !todo.completed;
      })
    } else if (screen == "Completed") {
      return todos.filter(function (todo) {
        return todo.completed;
      })
    } else {
      return todos;
    }
  }

  render() {
    const { new_todo } = this.state;
    const { todos, show_new_todo, screen, deleteTodo, updateTodo } = this.props;

    let listItm = [];
    if (todos.length > 0) {
      let scrTodos = this.screenFilterTodos();
      listItm = scrTodos.map((todo, index) =>
        <ToDoItem
          key={index}
          todo={todo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      );
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>{screen}</Title>
          </Body>
        </Header>
        <Content>
          {listItm}
          {new_todo &&
            <NewToDo
              onPress={this.saveToDoData}
              onCancel={this.addNewToDo}
            />
          }
        </Content>
        {show_new_todo &&
          <AddToDoButton onAddNewToDo={this.addNewToDo} />
        }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todo_reducer.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
    updateTodo: (todo) => dispatch(updateTodo(todo)),
    loadTasks: () => dispatch(loadTasks())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoAll)
