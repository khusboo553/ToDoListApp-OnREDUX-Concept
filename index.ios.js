/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, combineReducers,applyMiddleware, compose} from 'redux';
import allReducer from './ToDoListFile/Reducer/reducerIndex';
import HomeClass from './ToDoListFile/Component/homePage.js';

const store = createStore(allReducer);
export default class ToDoListApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeClass/>
     </Provider>
    );
  }
}


AppRegistry.registerComponent('ToDoListApp', () => ToDoListApp);
