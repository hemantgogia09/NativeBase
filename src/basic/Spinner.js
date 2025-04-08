import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import variable from '../theme/variables/platform';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import ThemeContext from '../theme/ThemeContext';

class Spinner extends Component {
  static contextType = ThemeContext;
  render() {
    // Get theme from the modern context
    const theme = this.context;
    
    // Access variables using the new context pattern
    const variables = theme && theme['@@shoutem.theme/themeStyle']
      ? theme['@@shoutem.theme/themeStyle'].variables
      : variable;
    return (
      <ActivityIndicator
        ref={c => (this._root = c)}
        {...this.props}
        color={
          this.props.color
            ? this.props.color
            : this.props.inverse
            ? variables.inverseSpinnerColor
            : variables.defaultSpinnerColor
        }
        size={this.props.size ? this.props.size : 'large'}
      />
    );
  }
}

Spinner.propTypes = {
  ...ActivityIndicator.propTypes,
  color: PropTypes.string,
  inverse: PropTypes.bool
};

// Create a functional component wrapper to use with connectStyle
// This is to ensure compatibility with the new context API
const SpinnerWithModernContext = (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => <Spinner {...props} />}
    </ThemeContext.Consumer>
  );
};

// Apply the propTypes to the wrapper component
SpinnerWithModernContext.propTypes = Spinner.propTypes;

const StyledSpinner = connectStyle(
  'NativeBase.Spinner',
  {},
  mapPropsToStyleNames
)(SpinnerWithModernContext);

export { StyledSpinner as Spinner };
