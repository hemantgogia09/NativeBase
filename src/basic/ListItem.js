import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  Platform,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import variable from '../theme/variables/platform';
import ThemeContext from '../theme/ThemeContext';

class ListItem extends Component {
  static contextType = ThemeContext;
  render() {
    // Get theme from the modern context
    const theme = this.context;
    
    // Access variables using the new context pattern
    const variables = theme && theme['@@shoutem.theme/themeStyle']
      ? theme['@@shoutem.theme/themeStyle'].variables
      : variable;

    if (
      Platform.OS === 'ios' ||
      Platform.OS === 'web' ||
      variables.androidRipple === false ||
      (!this.props.onPress && !this.props.onLongPress) ||
      Platform.Version <= 21
    ) {
      return (
        <TouchableHighlight
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
          ref={c => (this._root = c)}
          underlayColor={variables.listBtnUnderlayColor}
          {...this.props}
          style={this.props.touchableHighlightStyle}
        >
          <View {...this.props} testID={undefined}>
            {this.props.children}
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableNativeFeedback
        ref={c => (this._root = c)}
        useForeground
        {...this.props}
      >
        <View style={{ marginLeft: -17, paddingLeft: 17 }}>
          <View {...this.props} testID={undefined}>
            {this.props.children}
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

ListItem.propTypes = {
  ...TouchableHighlight.propTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  touchableHighlightStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  itemDivider: PropTypes.bool,
  button: PropTypes.bool
};

// Create a functional component wrapper to use with connectStyle
// This is to ensure compatibility with the new context API
const ListItemWithModernContext = (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => <ListItem {...props} />}
    </ThemeContext.Consumer>
  );
};

// Apply the propTypes to the wrapper component
ListItemWithModernContext.propTypes = ListItem.propTypes;

const StyledListItem = connectStyle(
  'NativeBase.ListItem',
  {},
  mapPropsToStyleNames
)(ListItemWithModernContext);

export { StyledListItem as ListItem };
