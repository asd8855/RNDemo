import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image
} from "react-native";

import ImagePicker from "react-native-image-picker";

export default class ImagePickerScreen extends Component {
  static navigationOptions = { title: "照片(单选)" };

  state = { avatarSource: null, videoSource: null };

  //选择图片
  /**
   *mediaType: 图片或视频 'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
   *allowsEditing: bool 是否可以编辑
   *videoQuality: 视频质量 'low', 'medium', or 'high' on iOS, 'low' or 'high' on Android
   *noData: 如果为true，则禁用data生成的base64 字段（极大地提高大图片的性能）
   * @memberof ImagePickerScreen
   */
  selectPhotoTapped() {
    const options = {
      title: "选择图片",
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "拍照",
      chooseFromLibraryButtonTitle: "选择照片",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      cameraType: "back",
      mediaType: "photo",
      videoQuality: "high",
      durationLimit: 10,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: { skipBackup: true }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert("custom");
      } else {
        let source = {
          uri: response.uri
        };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  //选择视频
  selectVideoTapped() {
    const options = {
      title: "选择视频",
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "录制视频",
      chooseFromLibraryButtonTitle: "选择视频",
      mediaType: "video",
      videoQuality: "medium"
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled video picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[
              styles.avatar,
              styles.avatarContainer,
              { marginBottom: 30 }
            ]}
          >
            {this.state.avatarSource === null ? (
              <Text>选择照片</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>选择视频</Text>
          </View>
        </TouchableOpacity>

        {this.state.videoSource && (
          <Text style={{ margin: 8, textAlign: "center" }}>
            {this.state.videoSource}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100
  }
});
