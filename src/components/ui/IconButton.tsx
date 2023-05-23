import React from 'react';
import {View, Text, StyleSheet, Pressable, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../configs/colors';

interface Props {
  name: string;
  color?: string;
  size?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

const IconButton = ({
  name,
  color = Colors.theme,
  size = 30,
  style,
  onPress,
}: Props): JSX.Element => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && {opacity: 0.5},
        style,
      ]}
      onPress={onPress}>
      <Icon name={name} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
