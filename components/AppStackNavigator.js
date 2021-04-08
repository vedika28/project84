import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import ReceiverDetails from "../screens/ReceiverDetails";

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
  },
  {
    initialRouteName: "HomeScreen",
  }
);
