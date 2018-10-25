import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import LoadListView from "../component/LoadListView";
export default class DetailScreen extends Component {
  static navigationOptions = {
    title: "加载更多"
  };

  state = {
    refreshing: false,
    pageTotal: 5,
    footType: 0,
    dataSource: [],
    pageNo: 1
  };

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push(i);
    }
    setTimeout(() => {
      this.setState({
        dataSource: array,
        pageNo: 1,
        refreshing: false
      });
    }, 1000);
  };

  loadMoreData = () => {
    setTimeout(() => {
      let array = this.state.dataSource;
      let pageNo = this.state.pageNo++;
      let pageTotal = this.state.pageTotal;

      //   let i = array[array.length - 1];
      let k = array.length;

      for (let i = k; i < k + 10; i++) {
        array.push(i);
      }
      this.setState({
        dataSource: array,
        pageNo: pageNo,
        footType: pageNo >= pageTotal ? 1 : 0,
        refreshing: false
      });
    }, 1000);
  };

  render() {
    let { refreshing, footType, pageTotal, dataSource } = this.state;

    return (
      <View style={styles.wrapper}>
        <LoadListView
          style={{ backgroundColor: "#fff", flex: 1, width: "100%" }}
          loading={refreshing}
          onRefreshData={this.refreshData}
          loadMoreData={this.loadMoreData}
          dataSource={dataSource}
          pageTotal={pageTotal}
          footType={footType}
          renderRow={item => {
            return (
              <View
                style={{
                  flex: 1,
                  height: 44,
                  width: 200,
                  backgroundColor: "#F5FCFF"
                }}
              >
                <Text style={{ flex: 1 }}>{item}</Text>
              </View>
            );
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
