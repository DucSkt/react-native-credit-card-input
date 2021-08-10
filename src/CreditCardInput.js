import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  ViewPropTypes,
} from "react-native";

import CreditCard from "./CardView";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    marginLeft: 7,
  },
  inputLabel: {
    fontWeight: "bold",
  },
  input: {
  },
});

const CVC_INPUT_WIDTH = 60;
const EXPIRY_INPUT_WIDTH = 70;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 55;
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get("window").width - EXPIRY_INPUT_WIDTH - CVC_INPUT_WIDTH - CARD_NUMBER_INPUT_WIDTH_OFFSET;
const NAME_INPUT_WIDTH = CARD_NUMBER_INPUT_WIDTH;
const PREVIOUS_FIELD_OFFSET = 40;
const POSTAL_CODE_INPUT_WIDTH = 120;

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: ViewPropTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    cardImageFront: PropTypes.number,
    cardImageBack: PropTypes.number,
    cardScale: PropTypes.number,
    cardFontFamily: PropTypes.string,
    cardBrandIcons: PropTypes.object,
    isFromPaypal: PropTypes.bool,
    allowScroll: PropTypes.bool,
    isFromPaypalDetail: PropTypes.bool,
    isFromCardDetail: PropTypes.bool,
    isFromUpdateCard: PropTypes.bool,
    additionalInputsProps: PropTypes.objectOf(PropTypes.shape(TextInput.propTypes)),
  };

  static defaultProps = {
    cardViewSize: {},
    labels: {
      name: "Card holder name",
      number: "Card number",
      expiry: "Exp",
      cvc: "CVV",
      postalCode: "POSTAL CODE",
    },
    placeholders: {
      name: "Full Name",
      number: "**** **** **** ****",
      expiry: "MM/YY",
      cvc: "CVV",
      postalCode: "34567",
    },
    inputContainerStyle: {
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
    isFromCardDetail: false,
    isFromPaypalDetail: false,
    isFromUpdateCard: false,
    isFromPaypal: false,
    allowScroll: false,
    additionalInputsProps: {},
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field || this.props.isFromPaypal) return;

    const scrollResponder = this.refs.Form.getScrollResponder();
    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
      e => { throw e; },
      x => {
        scrollResponder.scrollTo({ x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0), animated: true });
        this.refs[field].focus();
      });
  }

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputsProps, isFromUpdateCard
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      labelStyle: [s.inputLabel, labelStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,
      label: labels[field],
      placeholder: placeholders[field],
      value: (isFromUpdateCard && field === 'number') ? '' :values[field],
      status: status[field],
      isFromUpdateCard,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,

      additionalInputProps: additionalInputsProps[field],
    };
  };

  render() {
    const {
      cardImageFront, cardImageBack, inputContainerStyle,
      values: { number, expiry, cvc, name, type }, focused,
      allowScroll, requiresName, requiresCVC, requiresPostalCode,
      cardScale, cardFontFamily, cardBrandIcons, isFromPaypal, bgPaypal, iconPaypal, isFromCardDetail, isFromUpdateCard, isFromPaypalDetail, placeholders
    } = this.props;

    if(isFromPaypalDetail) {
      return (
        <View style={s.container}>
          <CreditCard focused={focused}
                      brand={type}
                      scale={cardScale}
                      isFromPaypal={true}
                      iconPaypal={iconPaypal}
                      bgPaypal={bgPaypal}
                      fontFamily={cardFontFamily}
                      imageFront={cardImageFront}
                      imageBack={cardImageFront}
                      customIcons={cardBrandIcons}
                      name={requiresName ? name : " "}
                      number={number}
                      expiry={expiry}
                      cvc={cvc} />
        </View>
      )
    }

    if(isFromCardDetail) {
      return (
        <View style={s.container}>
          <CreditCard focused={focused}
                      brand={type}
                      scale={cardScale}
                      isFromCardDetail={isFromCardDetail}
                      bgPaypal={bgPaypal}
                      fontFamily={cardFontFamily}
                      imageFront={cardImageFront}
                      imageBack={cardImageFront}
                      customIcons={cardBrandIcons}
                      name={requiresName ? name : " "}
                      number={number}
                      expiry={expiry}
                      cvc={cvc} />
        </View>
      )
    }

    if(isFromCardDetail) {
      return (
        <View style={s.container}>
          <CreditCard focused={focused}
                      brand={type}
                      scale={cardScale}
                      isFromCardDetail={isFromCardDetail}
                      bgPaypal={bgPaypal}
                      fontFamily={cardFontFamily}
                      imageFront={cardImageFront}
                      imageBack={cardImageFront}
                      customIcons={cardBrandIcons}
                      name={requiresName ? name : " "}
                      number={number}
                      expiry={expiry}
                      cvc={cvc} />
        </View>
      )
    }
    if(isFromPaypal) {
      return      (
        <View style={s.container}>
          <CreditCard focused={focused}
                      brand={type}
                      scale={cardScale}
                      isFromPaypal={isFromPaypal}
                      iconPaypal={iconPaypal}
                      bgPaypal={bgPaypal}
                      fontFamily={cardFontFamily}
                      imageFront={cardImageFront}
                      imageBack={cardImageFront}
                      customIcons={cardBrandIcons}
                      name={requiresName ? name : " "}
                      number={number}
                      expiry={expiry}
                      cvc={cvc} />
          { requiresName &&
          <CCInput {...this._inputProps("name")}
                   containerStyle={[ inputContainerStyle, { width: Dimensions.get("window").width - 40, marginTop: 25 }]} /> }
        </View>
      )
    }

    return (
      <View style={s.container}>
        <CreditCard focused={focused}
                    brand={type}
                    isFromUpdateCard={isFromUpdateCard}
                    scale={cardScale}
                    fontFamily={cardFontFamily}
                    imageFront={cardImageFront}
                    placeholder={placeholders}
                    imageBack={cardImageFront}
                    customIcons={cardBrandIcons}
                    name={requiresName ? name : " "}
                    number={isFromUpdateCard ? placeholders.number : number}
                    expiry={expiry}
                    cvc={cvc} />
        { requiresName &&
        <CCInput {...this._inputProps("name")}
                 autoCapitalize={'words'}
                 containerStyle={[  { width: Dimensions.get("window").width- 40, marginTop: 20 }]} /> }
        <ScrollView ref="Form"
                    horizontal
                    keyboardShouldPersistTaps="always"
                    scrollEnabled={allowScroll}
                    showsHorizontalScrollIndicator={false}
                    style={s.form}>
          <CCInput {...this._inputProps("number")}
                   keyboardType="numeric"
                   containerStyle={[ isFromUpdateCard ? {} : s.inputContainer, inputContainerStyle, { width: CARD_NUMBER_INPUT_WIDTH, marginLeft: 20 }]} />
          <CCInput {...this._inputProps("expiry")}
                   keyboardType="numeric"
                   containerStyle={[s.inputContainer, inputContainerStyle, { width: EXPIRY_INPUT_WIDTH }]} />
          { requiresCVC &&
          <CCInput {...this._inputProps("cvc")}
                   keyboardType="numeric"
                   containerStyle={[s.inputContainer, inputContainerStyle, { width: CVC_INPUT_WIDTH, marginRight: 25 }]} /> }
          { requiresPostalCode &&
          <CCInput {...this._inputProps("postalCode")}
                   keyboardType="numeric"
                   containerStyle={[s.inputContainer, inputContainerStyle, { width: POSTAL_CODE_INPUT_WIDTH }]} /> }
        </ScrollView>
      </View>
    );
  }
}
