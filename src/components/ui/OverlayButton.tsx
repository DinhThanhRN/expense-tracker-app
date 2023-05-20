import React from 'react';
import {View, Text, StyleSheet, ViewStyle, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';

interface Props {
  icon?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const OverlayButton = ({icon, style, onPress}: Props): JSX.Element => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.container, style, {opacity: 0.5}]
          : [styles.container, style]
      }
      onPress={onPress}>
      {icon && <Icon name={icon} color={Colors.white} size={40} />}
    </Pressable>
  );
};

export default OverlayButton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.theme,
    margin: Sizes.globalPadding,
  },
});
