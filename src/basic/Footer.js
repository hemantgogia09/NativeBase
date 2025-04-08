import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, SafeAreaView } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import getStyle from '../utils/getStyle';
import ThemeContext from '../theme/ThemeContext';

class Footer extends Component {
  static contextType = ThemeContext;

  render() {
    const { style } = this.props;

    return (
      <SafeAreaView
        style={{
          backgroundColor: getStyle(style).backgroundColor
        }}
      >
        <View ref={c => (this._root = c)} {...this.props} />
      </SafeAreaView>
    );
  }
}

Footer.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

// Create a functional component wrapper to use with connectStyle
// This is to ensure compatibility with the new context API
const FooterWithModernContext = (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => <Footer {...props} />}
    </ThemeContext.Consumer>
  );
};

// Apply the propTypes to the wrapper component
FooterWithModernContext.propTypes = Footer.propTypes;

const StyledFooter = connectStyle(
  'NativeBase.Footer',
  {},
  mapPropsToStyleNames
)(FooterWithModernContext);
export { StyledFooter as Footer };
