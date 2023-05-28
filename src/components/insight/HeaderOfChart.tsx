import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NumberPicker from './NumberPicker';
import {Colors} from '../../configs/colors';

interface Props {
  title: String;
  value?: number;
  onChangeValue?: (value: number) => void;
}

const HeaderOfChart = ({
  title,
  value,
  onChangeValue = () => {},
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{title.toUpperCase()}</Text>
      <NumberPicker
        value={value}
        style={{position: 'absolute', right: 8, top: 8}}
        onChange={val => onChangeValue(val)}
      />
    </View>
  );
};

export default HeaderOfChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});
