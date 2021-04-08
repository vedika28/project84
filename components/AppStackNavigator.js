import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import ReceiverDetails from "../screens/ReceiverDetails";
import NotificationsScreen from "../screens/NotificationsScreen";

export const AppStackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReceiverDetails: {
      screen: ReceiverDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        headerShown: false,
      },
    }
  },
  {
    initialRouteName: "HomeScreen",
  }
);
