/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

//declare routes folder
import Drawer from "./js/screen/Drawer";
import Splash from "./js/screen/splash";
import Home from "./js/screen/home";

//declare screens in app
const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },   //menu
        Splash: { screen: Splash },
        Home: { screen: Home },
      },
    {
        initialRouteName: "Splash",   //open this page first time
        headerMode: "none",
        cardStyle: {
          paddingTop: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: '#fff'
        }
    }
  );

  export default () =>
      <Root>
          <AppNavigator />
      </Root>;
