import React, { Component } from "react";
import { StyleSheet,Text, View, Button } from "react-native";

export default class DetailScreen extends Component {
  static navigationOptions = {
    title: "详情",
    headerStyle: {
      backgroundColor: "#f4511e"
    }
  };



  render() {
    return (
      <View style={styles.wrapper }>
        <Text> 详情 </Text>
        {/* onPress={() => this.props.navigation.navigate('Detail')} */}

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
  },
});
