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
import RenderCallbackCpm from "../detail/RenderCallBackCmp";
import SlotCmp from "../detail/SlotCmp";

let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.MANUAL
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
        "QRScanner",
        "Video",
        "FullScreenVideo",
        "LoadMore"
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

        <SlotCmp>
          <Text>
            该组件适应于一个组件大部分是一样的，极个别UI子组件需要自定义，可通过该方法进行自定义。
            父组件修改子组件
          </Text>
        </SlotCmp>

        <RenderCallbackCpm>{msg => <Text>{msg}</Text>}</RenderCallbackCpm>

        <Text>V1</Text>
        <Button title="检查更新" onPress={() => this.update()} />
      </View>
    );
  }

  update() {
    CodePush.checkForUpdate()
      .then(update => {
        debugger;
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
              updateDialog: {
                optionalIgnoreButtonLabel: "稍后",
                optionalInstallButtonLabel: "立即更新",
                optionalUpdateMessage: "有新版本了，是否更新？",
                mandatoryUpdateMessage: "强制更新",
                title: "更新提示",
                mandatoryContinueButtonLabel: "立即更新"
              },
              installMode: CodePush.InstallMode.IMMEDIATE,
              mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE
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
      })
      .catch(error => {
        console.log(error);
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
