import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import Video from "react-native-video";

const { height, width } = Dimensions.get("screen");

export default class VideoScreen extends Component {
  static navigationOptions = {
    title: "视频播放"
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Video
          source={{ uri: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" }}
          ref={player => {
            this.player = player;
          }}
          onEnd={() => {
            this.player.seek(0);
          }}
          style={{
            flex: 1,
            height,
            width,
            backgroundColor: "#F5FCFF"
          }}
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
