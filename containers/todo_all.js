import React from 'react';
import { Container, Header, Title, Content, Body, Text, Icon } from 'native-base';
import todo_reducer from "../store/reducers/todo_reducer";

import NewToDo from '../components/new_todo';
import AddToDoButton from '../components/add_todo_button';
import ToDoItem from "../components/todo_item";
import { connect } from 'react-redux';
import {fetchToDos, deleteTask, updateTask, AddTask} from "../store/reducers/todo_reducer";
class ToDoAll extends React.Component {


  componentDidMount(){
    this.props.fetchToDos();
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
    const { error, loading, todos,  show_new_todo, screen, deleteTodo, updateTodo } = this.props;

    if(error){
      return <Text>Error {error.message}</Text>
    }

    if(loading){
      return <Text>Loading...</Text>
    }

    let listItm = [];
    if (todos.length > 0) {
      let scrTodos = this.screenFilterTodos();
      listItm = scrTodos.map((todos, index) =>
        <ToDoItem
          key={index}
          todo={todos}
          deleteTodo={this.props.deleteTask}
          updateTodo={this.props.updateTask}
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
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
    todos:state.todo_reducer.todos,
    loading: state.todo_reducer.loading,
    error:state.todo_reducer.error
});

const mapDispatchToProps =  {
    fetchToDos,
    deleteTask,
    updateTask,
    AddTask
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoAll)
