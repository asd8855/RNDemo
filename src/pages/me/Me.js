import React, { Component } from "react";
import { Text, View } from "react-native";

export default class MeScreen extends Component {
  static navigationOptions = {
    title: "我的"
  };

  render() {
    return (
      <View>
        <Text> Me </Text>
      </View>
    );
  }
}
