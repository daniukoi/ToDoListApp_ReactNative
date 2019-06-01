import { combineReducers } from 'redux';

import todo_reducer from './todo_reducer';
import { TabNavigator } from "../../navigation/main_navigation";
import { createNavigationReducer } from 'react-navigation-redux-helpers';
const navReducer = createNavigationReducer(TabNavigator);
export default combineReducers({
    todo_reducer,
    nav: navReducer,
});

