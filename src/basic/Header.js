/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
import { connectStyle } from 'native-base-shoutem-theme';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StatusBar, ViewPropTypes, SafeAreaView } from 'react-native';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import getStyle from '../utils/getStyle';
import variable from '../theme/variables/platform';

// Import ThemeContext from your theme provider
// If you don't have a separate file for this context, you can create it here:
import ThemeContext from '../theme/ThemeContext';

class Header extends Component {
  static contextType = ThemeContext; // Using the static contextType for class components

  render() {
    const {
      androidStatusBarColor,
      iosBarStyle,
      style,
      transparent,
      translucent
    } = this.props;

    // Get theme from the modern context
    const theme = this.context;
    
    // Access variables using the new context pattern
    const variables = theme && theme['@@shoutem.theme/themeStyle']
      ? theme['@@shoutem.theme/themeStyle'].variables
      : variable;

    const platformStyle = variables.platformStyle;

    return (
      <View>
        <StatusBar
          backgroundColor={
            androidStatusBarColor
              ? androidStatusBarColor
              : variables.statusBarColor
          }
          barStyle={
            iosBarStyle
              ? iosBarStyle
              : platformStyle === 'material'
              ? 'light-content'
              : variables.iosStatusbar
          }
          translucent={transparent ? true : translucent}
        />
        <SafeAreaView
          style={{
            backgroundColor: getStyle(style).backgroundColor
          }}
        >
          <View ref={c => (this._root = c)} {...this.props} />
        </SafeAreaView>
      </View>
    );
  }
}

// Create a functional component wrapper to use with connectStyle
// This is to ensure compatibility with the new context API
const HeaderWithModernContext = (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => <Header {...props} />}
    </ThemeContext.Consumer>
  );
};

Header.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  searchBar: PropTypes.bool,
  rounded: PropTypes.bool
};

// Apply the propTypes to the wrapper component
HeaderWithModernContext.propTypes = Header.propTypes;

const StyledHeader = connectStyle(
  'NativeBase.Header',
  {},
  mapPropsToStyleNames
)(HeaderWithModernContext);

export { StyledHeader as Header };
