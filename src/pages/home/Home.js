import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";

import CodePush from "react-native-code-push";

let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
};

class HomeScreen extends Component {
  componentWillMount() {}

  componentDidMount() {}

  static navigationOptions = {
    title: "首页",
    headerStyle: { backgroundColor: "#f4511e" }
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [
        "LinearGradient",
        "QRCode",
        "DeviceInfo",
        "ImagePicker",
        "ImagePicker2",
        "QRScanner"
      ]
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{ backgroundColor: "green" }}
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 36,
                marginRight: 0,
                marginLeft: 0,
                justifyContent: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#EBEEEF"
              }}
              activeOpacity={1}
              onPress={() => {
                this.props.navigation.push(item);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Button title="检查更新" onPress={() => this.update()} />
      </View>
    );
  }

  update() {
    let deploymentKey =
      "gznakSDQMAWZMGj2Cdv875OuRQp-16019a3c-6414-4755-9fda-175132ca846e";
    CodePush.checkForUpdate(deploymentKey).then(update => {
      if (!update) {
        Alert.alert("提示", "已是最新版本--", [
          {
            text: "Ok",
            onPress: () => {
              console.log("点了OK");
            }
          }
        ]);
      } else {
        CodePush.sync(
          {
            deploymentKey: deploymentKey,
            updateDialog: {
              optionalIgnoreButtonLabel: "稍后",
              optionalInstallButtonLabel: "立即更新",
              optionalUpdateMessage: "有新版本了，是否更新？",
              title: "更新提示"
            },
            installMode: CodePush.InstallMode.IMMEDIATE
          },
          status => {
            switch (status) {
              case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("DOWNLOADING_PACKAGE");
                break;
              case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log(" INSTALLING_UPDATE");
                break;
            }
          },
          progress => {
            console.log(
              progress.receivedBytes +
                " of " +
                progress.totalBytes +
                " received."
            );
          }
        );
      }
    });
  }
}

HomeScreen = CodePush(codePushOptions)(HomeScreen);
export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
