import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
} from "react-native";

const s = StyleSheet.create({
  baseInputStyle: {
    color: "black",
    paddingTop: 7,
    paddingBottom: 7,
  },
});

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    autoCapitalize: PropTypes.string,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    isFromUpdateCard: PropTypes.bool,
    additionalInputProps: PropTypes.shape(TextInput.propTypes),
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    additionalInputProps: {},
    autoCapitalize: 'none',
    isFromUpdateCard: false,
  };

  componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "" && field !== 'name') onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid" && field !== 'name') onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  onSubmitHandler = () => {
    const { field, onBecomeValid } = this.props;
    if(field) {
      onBecomeValid(field)
    }
  }

  render() {
    const { label, value, placeholder, status, keyboardType,
      containerStyle, inputStyle, labelStyle,
      validColor, invalidColor, placeholderColor, autoCapitalize, isFromUpdateCard,
      additionalInputProps } = this.props;
    return (
      <TouchableOpacity onPress={this.focus}
                        activeOpacity={0.99}>
        <View style={[containerStyle]}>
          { !!label && <Text style={[labelStyle]}>{label}</Text>}
          <TextInput ref="input"
                     {...additionalInputProps}
                     keyboardType={keyboardType}
                     autoCapitalise="words"
                     autoCorrect={false}
                     onSubmitEditing={(event) => this.onSubmitHandler()}
                     returnKeyType="go"
                     style={[
                       s.baseInputStyle,
                       inputStyle,
                       ((validColor && status === "valid") ? { color: validColor } :
                         (invalidColor && status === "invalid") ? { color: invalidColor } :
                           {}),
                     ]}
                     editable={(this.props.field === 'number' && isFromUpdateCard) ? false : true}
                     autoCapitalize={autoCapitalize}
                     underlineColorAndroid={"transparent"}
                     placeholderTextColor={placeholderColor}
                     placeholder={placeholder}
                     value={value}
                     onFocus={this._onFocus}
                     onChangeText={this._onChange} />
        </View>
      </TouchableOpacity>
    );
  }
}
