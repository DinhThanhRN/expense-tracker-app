import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, ViewStyle} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../configs/colors';
import FlatButton from './FlatButton';

interface Props {
  date: DateData;
  onReset?: () => void;
  onClose: (day: DateData) => void;
  style?: ViewStyle;
}

const MyCalendar = ({date, onReset, onClose, style}: Props): JSX.Element => {
  const [selected, setSelected] = useState<DateData>(date);
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={({pressed}) =>
          pressed ? [styles.close, {opacity: 0.5}] : styles.close
        }
        onPress={() => onClose(selected)}>
        <Icon name="close" size={24} color="red" />
      </Pressable>
      <Calendar
        style={styles.calendar}
        onDayPress={day => setSelected(day)}
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
    bottom: 130,
    left: 50,
    right: 50,
    backgroundColor: Colors.white,
    position: 'absolute',
    zIndex: 1,
    borderRadius: 12,
    justifyContent: 'center',
  },
  calendar: {
    width: '100%',
    height: '80%',
    borderRadius: 16,
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
