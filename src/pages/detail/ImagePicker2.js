import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  PixelRatio,
  ScrollView
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";

export default class ImagePicker2 extends Component {
  static navigationOptions = {
    title: "图片选择-(多选)"
  };
  state = {
    images: []
  };

  selectSinglePhotoTapped() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  selectMorePhotoTapped() {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 9,
      minFiles: 1,
      mediaType: "photo"
    }).then(images => {
      console.log(images);
      this.setState({ images: images });
    });
  }
  selectVideoTapped() {
    ImagePicker.openPicker({
      mediaType: "video"
    }).then(video => {
      console.log(video);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>https://github.com/ivpusic/react-native-image-crop-picker</Text>
          <Text>
            React-native-image-crop-picker如何把操作按钮等改成中文
            https://www.jianshu.com/p/0cb4bf55a08a
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.selectSinglePhotoTapped();
              }}
            >
              <View
                style={[
                  styles.avatar,
                  styles.avatarContainer,
                  { marginBottom: 30 }
                ]}
              >
                <Text>选择照片(单选)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.selectMorePhotoTapped();
              }}
            >
              <View
                style={[
                  styles.avatar,
                  styles.avatarContainer,
                  { marginBottom: 30 }
                ]}
              >
                <Text>选择照片(多选)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.selectVideoTapped();
              }}
            >
              <View style={[styles.avatar, styles.avatarContainer]}>
                <Text>选择视频</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.imageView}>{this._renderImageItem()}</View>
        </ScrollView>
      </View>
    );
  }

  _renderImageItem = () => {
    let buttonViews = this.state.images.map((item, index) => {
      let path = {
        uri: item.path
      };
      return (
        <TouchableOpacity key={index}>
          <Image style={styles.avatar} source={path} />
        </TouchableOpacity>
      );
    });
    return buttonViews;
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
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
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "red"
  },
  imageView: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 16
  }
});
