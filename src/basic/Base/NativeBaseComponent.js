import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../theme/ThemeContext';

export default class NativeBaseComponent extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    theme: PropTypes.object
  };

  static contextType = ThemeContext;

  // Note: getChildContext and childContextTypes are deprecated in React 16.3+
  // Components using this base class should now use ThemeContext.Provider instead

  getContextForegroundColor() {
    // Access foregroundColor from the modern context if available
    const theme = this.context;
    if (theme && theme.foregroundColor) {
      return theme.foregroundColor;
    }
    return null;
  }

  // Helper method to get the theme from either props or context
  getTheme() {
    return this.props.theme || this.context;
  }
}
