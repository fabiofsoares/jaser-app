import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

//Pages
import HomeScreen from '../pages/home'
import SettingsScreen from '../pages/settings'
import FavoritesScreen from '../pages/favorites'
import GameScreen from '../pages/game'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Settings: {
        screen: SettingsScreen
    },
    Favorites: {
        screen: FavoritesScreen
    },
    Game : {
        screen: GameScreen
    }
});

export const AppContainer = createAppContainer(AppNavigator);