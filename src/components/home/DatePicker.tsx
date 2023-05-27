import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Colors} from '../../configs/colors';

interface Props {
  onPress?: () => void;
  date: Date;
}

const DatePicker = ({date, onPress}: Props): JSX.Element => {
  return (
    <Pressable
      style={({pressed}) => pressed && {opacity: 0.5}}
      onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {new Intl.DateTimeFormat('en-GB', {
            month: 'long',
            year: '2-digit',
          }).format(new Date(date))}
        </Text>
      </View>
    </Pressable>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: 80,
    backgroundColor: Colors.theme200,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Colors.white,
  },
});
