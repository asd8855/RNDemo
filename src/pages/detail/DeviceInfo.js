import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DeviceInfo from "react-native-device-info";

export default class DeviceInfoScreen extends Component {
  static navigationOptions = {
    title: "设备信息"
  };

  state = {
    ip: "",
    brand: DeviceInfo.getBrand()
  };

  componentDidMount() {
    DeviceInfo.getIPAddress().then(ip => {
      // "92.168.32.44"
      this.setState({ ip: ip });
    });
  }

  render() {
    const brand = DeviceInfo.getBrand();
    const buildNumber = DeviceInfo.getBuildNumber();
    const bundleId = DeviceInfo.getBundleId();
    const carrier = DeviceInfo.getCarrier(); // "SOFTBANK"
    const deviceCountry = DeviceInfo.getDeviceCountry(); // "US"
    const deviceId = DeviceInfo.getDeviceId();
    const deviceLocale = DeviceInfo.getDeviceLocale();
    const deviceName = DeviceInfo.getDeviceName();
    const firstInstallTime = DeviceInfo.getFirstInstallTime();
    const fontScale = DeviceInfo.getFontScale(); // 1.2
    const freeDiskStorage = DeviceInfo.getFreeDiskStorage();
    const manufacturer = DeviceInfo.getManufacturer();
    const model = DeviceInfo.getModel();
    const phoneNumber = DeviceInfo.getPhoneNumber();
    const systemVersion = DeviceInfo.getSystemVersion();
    const uniqueId = DeviceInfo.getUniqueID();
    const userAgent = DeviceInfo.getUserAgent();
    const version = DeviceInfo.getVersion();

    return (
      <View style={styles.wrapper}>
        <Text>品牌 --- {brand}</Text>
        <Text>BuildNumber --- {buildNumber}</Text>
        <Text>BundleId --- {bundleId}</Text>
        <Text>运营服务商 --- {carrier}</Text>
        <Text>设备所在国 --- {deviceCountry}</Text>
        <Text>设备ID --- {deviceId}</Text>
        <Text>语言 --- {deviceLocale}</Text>
        <Text>设备名称 --- {deviceName}</Text>
        <Text>第一次安装时间 --- {firstInstallTime}</Text>
        <Text>fontScale --- {fontScale}</Text>
        <Text>freeDiskStorage --- {freeDiskStorage}</Text>
        <Text>IP --- {this.state.ip}</Text>
        <Text>设备制造商 --- {manufacturer}</Text>
        <Text>Model --- {model}</Text>
        <Text>PhoneNumber --- {phoneNumber}</Text>
        <Text>SystemVersion --- {systemVersion}</Text>
        <Text>设备唯一ID --- {uniqueId}</Text>
        <Text>UserAgent --- {userAgent}</Text>
        <Text>Version --- {version}</Text>

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
    // alignItems: "center",
    // justifyContent: "center"
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
