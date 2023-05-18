import React from 'react';
import {Pressable} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../configs/colors';

interface Props {
  children: String;
  onPress?: () => void;
}

const PressableText = ({children, onPress}: Props): JSX.Element => {
  return (
    <Pressable
      style={({pressed}) => pressed && {opacity: 0.5}}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default PressableText;

const styles = StyleSheet.create({
  text: {
    color: '#B0ded4',
    fontSize: 18,
    fontWeight: '500',
  },
});
