import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';
import Icon from 'react-native-vector-icons/Ionicons';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import variable from '../theme/variables/platform';
import computeProps from '../utils/computeProps';
import ThemeContext from '../theme/ThemeContext';

class Radio extends Component {
  static contextType = ThemeContext;
  prepareRootProps() {
    const defaultProps = {
      standardStyle: false
    };

    return computeProps(this.props, defaultProps);
  }

  render() {
    // Get theme from the modern context
    const theme = this.context;
    
    // Access variables using the new context pattern
    const variables = theme && theme['@@shoutem.theme/themeStyle']
      ? theme['@@shoutem.theme/themeStyle'].variables
      : variable;

    return (
      <TouchableOpacity
        ref={c => (this._root = c)}
        {...this.prepareRootProps()}
      >
        {Platform.OS === 'ios' && !this.props.standardStyle ? (
          this.props.selected && (
            <Icon
              style={{
                color: this.props.selectedColor
                  ? this.props.selectedColor
                  : variables.radioColor,
                lineHeight: 25,
                height: 20,
                fontSize: variables.radioBtnSize
              }}
              name="ios-checkmark"
            />
          )
        ) : (
          <Icon
            style={{
              color:
                Platform.OS === 'ios'
                  ? this.props.selected
                    ? this.props.selectedColor
                      ? this.props.selectedColor
                      : variables.radioColor
                    : this.props.color
                    ? this.props.color
                    : undefined
                  : this.props.selected
                  ? this.props.selectedColor
                    ? this.props.selectedColor
                    : variables.radioSelectedColorAndroid
                  : this.props.color
                  ? this.props.color
                  : undefined,
              lineHeight: variables.radioBtnLineHeight,
              fontSize: variables.radioBtnSize
            }}
            name={
              Platform.OS === 'ios'
                ? this.props.selected
                  ? 'ios-radio-button-on'
                  : 'ios-radio-button-off'
                : this.props.selected
                ? 'md-radio-button-on'
                : 'md-radio-button-off'
            }
          />
        )}
      </TouchableOpacity>
    );
  }
}

Radio.propTypes = {
  ...TouchableOpacity.propTypes,
  selected: PropTypes.bool,
  standardStyle: PropTypes.bool
};

// Create a functional component wrapper to use with connectStyle
// This is to ensure compatibility with the new context API
const RadioWithModernContext = (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => <Radio {...props} />}
    </ThemeContext.Consumer>
  );
};

// Apply the propTypes to the wrapper component
RadioWithModernContext.propTypes = Radio.propTypes;

const StyledRadio = connectStyle('NativeBase.Radio', {}, mapPropsToStyleNames)(
  RadioWithModernContext
);

export { StyledRadio as Radio };
