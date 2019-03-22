import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

//Pages
import HomeScreen from '../pages/home'
import MainScreen from '../pages/main'
import SettingsScreen from '../pages/settings'
import FavoritesScreen from '../pages/favorites'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Main: {
        screen: MainScreen
    },
    Settings: {
        screen: SettingsScreen
    },
    Favorites: {
        screen: FavoritesScreen
    }
});

export const AppContainer = createAppContainer(AppNavigator);