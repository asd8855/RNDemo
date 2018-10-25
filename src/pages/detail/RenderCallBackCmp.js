import React, { Component } from "react";
import { Text, View } from "react-native";

export default class RenderCallbackCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "RenderCallbackCpm"
    };
  }

  render() {
    return this.props.children(this.state.msg);
  }
}
