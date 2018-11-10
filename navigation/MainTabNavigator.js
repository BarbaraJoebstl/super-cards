import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import DeckListScreen from '../screens/DeckListScreen';
import DeckScreen from '../screens/DeckScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import NewQuestionScreen from '../screens/NewQuestionScreen';
import QuizScreen from '../screens/QuizScreen';

const DeckStack = createStackNavigator({
  Main: {
    screen: DeckListScreen
  },
  Deck: {
    screen: DeckScreen
  },
  NewDeck: {
    screen: NewDeckScreen
  },
  NewQuestion: {
    screen: NewQuestionScreen
  },
  Quiz: {
    screen: QuizScreen
  }

});

DeckStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-rocket${focused ? '' : '-outline'}`
          : 'md-rocket'
      }
    />
  ),
};


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  DeckStack,
  SettingsStack,
});
