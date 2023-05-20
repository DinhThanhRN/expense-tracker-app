import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../configs/colors';
import FlatButton from '../ui/FlatButton';

interface Props {
  date: DateData;
  onPress?: (day: DateData) => void;
  onReset?: () => void;
  onClose?: () => void;
}

const MyCalendar = ({date, onPress, onReset, onClose}: Props): JSX.Element => {
  const [selected, setSelected] = useState<DateData>(date);
  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) =>
          pressed ? [styles.close, {opacity: 0.5}] : styles.close
        }
        onPress={onClose}>
        <Icon name="close" size={24} color="red" />
      </Pressable>
      <Calendar
        style={styles.calendar}
        onDayPress={day => {
          setSelected(day);
          if (onPress) onPress(day);
        }}
        markedDates={
          selected && {
            [selected.dateString]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: Colors.dark,
            },
          }
        }
      />
      <FlatButton
        label="reset"
        containerStyle={styles.button}
        onPress={onReset}
      />
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    top: 130,
    bottom: 160,
    left: 50,
    right: 50,
    backgroundColor: Colors.white,
    position: 'absolute',
    zIndex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  calendar: {
    width: '100%',
    borderRadius: 16,
    // backgroundColor: Colors.dark,
  },
  button: {
    height: 40,
    alignSelf: 'center',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    elevation: 4,
  },
});
