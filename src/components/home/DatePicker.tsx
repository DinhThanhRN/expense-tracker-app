import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {DateData} from 'react-native-calendars';

import {Colors} from '../../configs/colors';

interface Props {
  onPress?: () => void;
  date: DateData;
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
            day: 'numeric',
          }).format(new Date(date.timestamp))}
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
  },
  text: {
    color: Colors.white,
  },
});
