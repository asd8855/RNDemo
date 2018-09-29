import React, { Component } from "react";
import { StyleSheet, Text, View, Button, NativeModules } from "react-native";
let iOSExport = NativeModules.NativeToReactModule;
export default class WorkScreen extends Component {
  static navigationOptions = { title: "工作" };

  render() {
    return (
      <View style={styles.wrapper}>
        <Button title="跳转至Native" onPress={() => this.gotoNative()} />
      </View>
    );
  }

  gotoNative() {
    iOSExport.reactPushToNative();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
