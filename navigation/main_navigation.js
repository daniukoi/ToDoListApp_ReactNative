import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import ToDoAll from '../containers/todo_all';
import { createReactNavigationReduxMiddleware, createReduxContainer } from "react-navigation-redux-helpers";
import { connect } from 'react-redux';

class AllToDo extends React.Component {
    render() {
        return (
            <ToDoAll show_new_todo={true} screen="All" />
        );
    }
}

class ActiveToDo extends React.Component {
    render() {
        return (
            <ToDoAll show_new_todo={false} screen="Active" />
        );
    }
}

class CompletedToDo extends React.Component {
    render() {
        return (
            <ToDoAll show_new_todo={false} screen="Completed" />
        );
    }
}

export const TabNavigator = createBottomTabNavigator({
    All: { screen: AllToDo },
    Active: { screen: ActiveToDo },
    Completed: { screen: CompletedToDo }
});


export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

const Apps = createReduxContainer(TabNavigator);
const mapStateToProps = state => ({
    state: state.nav
  });
export default connect(mapStateToProps)(Apps);
