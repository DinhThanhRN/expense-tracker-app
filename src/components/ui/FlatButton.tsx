import React from 'react';
import {View, Text, StyleSheet, Pressable, ViewStyle} from 'react-native';
import {Colors} from '../../configs/colors';

interface Props {
  label: String;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

const FlatButton = ({label, containerStyle, onPress}: Props): JSX.Element => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.container, containerStyle, {opacity: 0.5}]
          : [styles.container, containerStyle]
      }
      onPress={onPress}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
    </Pressable>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 64,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  label: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
