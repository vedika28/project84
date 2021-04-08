import React from "react";
import SignUpLoginScreen from "./screens/SignUpLoginScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {AppDrawerNavigator} from "./components/AppDrawerNavigator";
import {AppTabNavigator} from './components/AppTabNavigator'

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  SignUpLoginScreen: { screen: SignUpLoginScreen },
  Drawer: { screen: AppDrawerNavigator },
  AppTapNavigator: {screen: AppTabNavigator}, 
});

const AppContainer = createAppContainer(switchNavigator);
