import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import QRCode from "../../component/qrcode/index";

export default class QRCodeScreen extends Component {
  static navigationOptions = {
    title: "生成二维码"
  };

  state = {
    text: "http://facebook.github.io/react-native/",
    imageURL: ""
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text: text })}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={200}
          bgColor="#333"
          fgColor="white"
        />

        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.popToTop()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
