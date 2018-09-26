import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default class LinearGradientScreen extends Component {
  static navigationOptions = { title: "渐变色" };

  render() {
    return (
      <View style={styles.wrapper}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#FF7F61", "#FF484E"]}
          style={styles.linearGradient}
        >
          <Text>Sign in with Facebook</Text>
        </LinearGradient>

        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.push("Detail")}
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
  },
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height: 200,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  }
});
