import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

//Pages
import HomeScreen from '../pages/home'
import MainScreen from '../pages/main'
import SettingsScreen from '../pages/settings'

const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Main: {
        screen: MainScreen
    },
    Settings: {
        screen: SettingsScreen
    }
});

export const AppContainer = createAppContainer(AppNavigator);