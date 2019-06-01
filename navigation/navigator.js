import React from 'react';
import TabNavigator from "./main_navigation"
import { Provider } from 'react-redux';
import store from "../store/create_store";


export default class Navigation extends React.Component {

  render() {
        return (
          <Provider store = { store }>
            <TabNavigator />          
          </Provider>
        );
      }
  }
