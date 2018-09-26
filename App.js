// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "./src/pages/home/Home";
import MeScreen from "./src/pages/me/Me";
import WorkScreen from "./src/pages/work/Work";
import DetailScreen from "./src/pages/detail/Detail";
import LinearGradient from "./src/pages/detail/LinearGradient";
import QRCodeScreen from "./src/pages/detail/QRCode";
import DeviceInfoScreen from "./src/pages/detail/DeviceInfo";
import ImagePicker from "./src/pages/detail/ImagePicker";
import ImagePicker2 from "./src/pages/detail/ImagePicker2";
import QRScanner from "./src/pages/detail/QRScanner";

const Router = {
  Home: HomeScreen,
  Work: WorkScreen,
  Me: MeScreen,
  Detail: DetailScreen,
  LinearGradient: LinearGradient,
  QRCode: QRCodeScreen,
  DeviceInfo: DeviceInfoScreen,
  ImagePicker: ImagePicker,
  ImagePicker2: ImagePicker2,
  QRScanner: QRScanner
};

const HomeStack = createStackNavigator(Router, {
  initialRouteName: "Home"
});

const WorkStack = createStackNavigator(Router, {
  initialRouteName: "Work"
});

const MeStack = createStackNavigator(Router, {
  initialRouteName: "Me"
});

const TabRouterConfig = {
  HomeTab: {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => ({
      //非主页面不显示 tabbar
      tabBarVisible: navigation.state.index === 0,
      title: "首页"
    })
  },
  WorkTab: {
    screen: WorkStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0,
      title: "工作"
    })
  },
  MeTab: {
    screen: MeStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0,
      title: "我的"
    })
  }
};

const RootStack = createBottomTabNavigator(TabRouterConfig, {
  tabBarOptions: {
    activeTintColor: "#e91e63",
    inactiveTintColor: "#333",
    labelStyle: {
      fontSize: 12
    },
    tabBarVisible: false
  }
});

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}