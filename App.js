import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { AppTabNavigator } from './components/AppTabNavigator';
import OwnerLogin from './screens/OwnerLogin';
import CoustomerLogin from './screens/CoustomerLogin';

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  OwnerLogin: { screen: OwnerLogin },
  CoustomerLogin: { screen: CoustomerLogin },
  Drawer: { screen: AppDrawerNavigator },
  BottomTab: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
