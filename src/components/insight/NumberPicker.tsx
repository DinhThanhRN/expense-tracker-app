import React, {useState} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Colors} from '../../configs/colors';
import {Picker} from '@react-native-picker/picker';

interface Props {
  style?: ViewStyle;
  value: any;
  onChange?: (val: any) => void;
}

const NumberPicker = ({
  style,
  value,
  onChange = () => {},
}: Props): JSX.Element => {
  return (
    <View style={[styles.container, style]}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
        <Picker.Item label="3 latest month" value={3} />
        <Picker.Item label="4 latest month" value={4} />
        <Picker.Item label="5 latest month" value={5} />
        <Picker.Item label="6 latest month" value={6} />
      </Picker>
    </View>
  );
};

export default NumberPicker;

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 50,
    borderColor: Colors.dark,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.theme,
  },
  button: {
    width: 50,
    height: 30,
    // backgroundColor: Colors.dark,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark,
  },
});
