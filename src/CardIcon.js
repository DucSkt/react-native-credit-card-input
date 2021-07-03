import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import defaultIcons from "./Icons";

const BASE_SIZE = { width: '95%', height: 180 };

const s = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
  },
});

export default class CardIcon extends Component {

  render() {
    const { brand, iconStyle } = this.props;
    const Icons = { ...defaultIcons };

       return (
         <Image style={[s.icon, iconStyle]}
                resizeMode={'contain'}
                source={Icons[brand]} />
       );
  }
}
