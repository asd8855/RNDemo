"user strict";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, WebView, Platform } from "react-native";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    style: PropTypes.object,
    context: PropTypes.object,
    render: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func
  };

  render() {
    var contextString = JSON.stringify(this.props.context);
    var renderString = this.props.render.toString();
    return (
      <View style={this.props.style}>
        <WebView
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={Platform.OS === "android"}
          contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
          source={{
            html:
              '<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"><style>*{margin:0;padding:0;}canvas{transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector(\'canvas\');(' +
              renderString +
              ").call(" +
              contextString +
              ", canvas);</script>"
          }}
          opaque={false}
          underlayColor={"transparent"}
          style={this.props.style}
          javaScriptEnabled={true}
          scrollEnabled={false}
          onLoad={this.props.onLoad}
          onLoadEnd={this.props.onLoadEnd}
          originWhitelist={["*"]}
        />
      </View>
    );
  }
}
