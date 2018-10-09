import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Dimensions,
  CameraRoll,
  ScrollView
} from "react-native";
import QRCode from "../../component/qrcode/index";
import ViewShot from "react-native-view-shot";
const width = Dimensions.get("window").width;

export default class QRCodeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "生成二维码",
      headerRight: (
        <Button
          onPress={navigation.getParam("takePhoto")}
          title="保存图片"
          color="#333"
        />
      )
    };
  };

  state = { text: "http://facebook.github.io/react-native/", imageURL: "" };

  componentDidMount() {
    this.props.navigation.setParams({ takePhoto: this.takePhoto });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>家长扫描此二维码即可缴费</Text>
          <ViewShot ref="viewShot">
            <View style={styles.facePayView}>
              <View style={styles.titleView}>
                <Text style={styles.line} />
                <Text style={[styles.centerText, styles.title1]}>
                  支付宝教育缴费季
                </Text>
                <Text style={styles.line} />
              </View>

              <Text style={[styles.centerText, styles.title2]}>校易收缴费</Text>
              <Text
                style={[styles.centerText, styles.title3, { marginTop: 10 }]}
              >
                使用支付宝钱包
              </Text>
              <Text style={[styles.centerText, styles.title3]}>
                扫一扫下方的二维码进行缴费
              </Text>
              <View style={styles.schoolName}>
                <Text style={[styles.centerText, styles.title4]}>
                  星辉幼儿园雁塔园
                </Text>
              </View>

              {this._renderQRCode()}
              <View style={{ height: 50, backgroundColor: "#fff" }} />
            </View>
          </ViewShot>
        </View>
      </ScrollView>
    );
  }

  _renderQRCode = () => {
    if (this.state.text == "") {
      return null;
    } else {
      return (
        <View style={styles.qrCodeView1}>
          <View style={styles.qrCodeView2}>
            <View style={styles.qrCodeView3}>
              <QRCode
                value={this.state.text}
                size={140}
                bgColor="#333"
                fgColor="white"
              />
            </View>
          </View>
        </View>
      );
    }
  };

  takePhoto = () => {
    this.refs.viewShot.capture().then(uri => {
      let promise = CameraRoll.saveToCameraRoll(uri);
      promise.then(() => {
        alert("保存成功");
      });
    });
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    lineHeight: 70
  },
  title1: {
    lineHeight: 55,
    fontSize: 15,
    marginLeft: 16,
    marginRight: 16
  },
  title2: {
    fontSize: 35,
    fontWeight: "bold"
  },
  title3: {
    fontSize: 15,
    lineHeight: 20
  },
  title4: {
    color: "#1f95d4",
    textAlign: "center",
    fontSize: 12,
    maxWidth: "94%",
    padding: 5
  },
  line: {
    height: 2,
    backgroundColor: "#fff",
    flex: 0.3
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  schoolName: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: "center"
  },
  facePayView: {
    backgroundColor: "#1f95d4",
    width: width-32,
    marginBottom: 32,
    borderColor: "#ededed",
    borderWidth: 4,
    borderStyle: "solid",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  centerText: {
    textAlign: "center",
    color: "#fff"
  },
  qrCodeView1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
  qrCodeView2: {
    padding: 4,
    borderColor: "#fff",
    borderWidth: 2,
    borderStyle: "dashed"
  },
  qrCodeView3: {
    padding: 7,
    backgroundColor: "#fff"
  }
});
