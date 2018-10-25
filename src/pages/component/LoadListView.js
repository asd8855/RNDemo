import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Keyboard
} from "react-native";
// import NoDataView from "./NoDataView";

export default class LoadListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFoot: this.props.footType,
      pageNo: 1
    };
    this.onEndReachedCalledDuringMomentum = true;

  }

  static defaultProps = {
    loading: false,
    dataSource: [],
    pageTotal: 1,
    renderRow: null,
    footType: 0,
    onRefreshData: () => {}
  };

  _renderList = () => {
    if (this.props.dataSource && this.props.dataSource.length > 0) {
      return (
        <FlatList
          ListFooterComponent={() => this._renderFooter()}
          onEndReached={() => this._onEndReached()}
          onMomentumScrollBegin={() => {
             this.onEndReachedCalledDuringMomentum = false; }}

          onEndReachedThreshold={0.01}
          refreshing={this.props.loading}
          onRefresh={this._onRefresh}
          data={this.props.dataSource}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.props.renderRow(item)}
        />
      );
    } else {
      // return <NoDataView />;
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.footType !== prevState.showFoot) {
      debugger
      if (nextProps.dataSource.length % 10 == 0) {
        if (prevState.pageNo === nextProps.dataSource.length / 10) {
          return { showFoot: nextProps.footType };
        }
      } else {
        return { showFoot: nextProps.footType };
      }
    }
    return null;
  }

  render() {
    return <View style={styles.wrapper}>{this._renderList()}</View>;
  }
  _onRefresh = () => {
    debugger;
    this.state.pageNo = 1;
    this.props.onRefreshData();
  };
  _loadMore = () => {
    this.props.loadMoreData(this.state.pageNo);
  };

  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View>
          <Text style={styles.footerText}>没有更多数据了</Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footerView}>
          <ActivityIndicator />
          <Text style={[styles.footerText, { marginLeft: 8 }]}>
            正在加载更多数据...
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return null;
    }
  }

  _onEndReached() {

    if (this.onEndReachedCalledDuringMomentum) {
        return;
    }
    console.log(2222);

    this.onEndReachedCalledDuringMomentum = true;

    // 如果是正在加载中或没有更多数据了,则返回
    if (this.state.showFoot != 0) {
      return;
    }

    //如果当前页大于或等于总页数,那就是到最后一页,返回
    if (this.state.pageNo >= this.props.pageTotal) {
      this.setState({ showFoot: 1 });
      return;
    } else {
      if (this.props.dataSource.length % 10 == 0) {
        this.state.pageNo = this.props.dataSource.length / 10 + 1;
      } else {
        this.setState({ showFoot: 1 });
        return;
      }
    }

    //底部显示正在加载更多数据
    this.setState({ showFoot: 2 }, () => {
      if (this.state.pageNo > 1) {
        this._loadMore();
      }
    });
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  footerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  footerText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 44
  }
});
