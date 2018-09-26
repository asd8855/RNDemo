import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
export default class QRScanner extends Component {
  static navigationOptions = {
    title: "二维码扫描"
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <QRCodeScanner onRead={this.onSuccess.bind(this)} />

        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.popToTop()}
        />
      </View>
    );
  }

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error("An error occured", err)
    );
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
