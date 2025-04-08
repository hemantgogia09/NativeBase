import { connectStyle } from 'native-base-shoutem-theme';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

import variable from '../theme/variables/platform';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import getStyle from '../utils/getStyle';
import ThemeContext from '../theme/ThemeContext';

class Content extends PureComponent {
  static contextType = ThemeContext;

  render() {
    const {
      children,
      contentContainerStyle,
      disableKBDismissScroll,
      keyboardShouldPersistTaps,
      padder,
      style
    } = this.props;

    const containerStyle = {
      flex: 1,
      backgroundColor: getStyle(style).backgroundColor
    };

    // Get theme from the modern context
    const theme = this.context;
    
    // Access variables using the new context pattern
    const variables = theme && theme['@@shoutem.theme/themeStyle']
      ? theme['@@shoutem.theme/themeStyle'].variables
      : variable;

    return (
      <SafeAreaView style={containerStyle}>
        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          resetScrollToCoords={disableKBDismissScroll ? null : { x: 0, y: 0 }}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
          ref={c => {
            this._scrollview = c;
            this._root = c;
          }}
          {...this.props}
          contentContainerStyle={[
            { padding: padder ? variables.contentPadding : undefined },
            contentContainerStyle
          ]}
        >
          {children}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

Content.propTypes = {
  disableKBDismissScroll: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.string,
  padder: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

// Create a functional component wrapper to use with connectStyle
// This is to ensure compatibility with the new context API
const ContentWithModernContext = (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => <Content {...props} />}
    </ThemeContext.Consumer>
  );
};

// Apply the propTypes to the wrapper component
ContentWithModernContext.propTypes = Content.propTypes;

const StyledContent = connectStyle(
  'NativeBase.Content',
  {},
  mapPropsToStyleNames
)(ContentWithModernContext);

export { StyledContent as Content };
