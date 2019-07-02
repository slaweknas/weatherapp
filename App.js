import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TransitionConfiguration } from "./transitionConfig";
import TodayScreen from "./screens/TodayScreen";
import WeekScreen from "./screens/WeekScreen";

const MainNavigator = createStackNavigator(
  {
    TodayScreen: { screen: TodayScreen },
    WeekScreen: { screen: WeekScreen }
  },
  {
    initialRouteName: "TodayScreen",
    transitionConfig: TransitionConfiguration
  }
);

const App = createAppContainer(MainNavigator);

export default App;
