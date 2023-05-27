import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';

import DatePicker from './DatePicker';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';

interface Props {
  date: Date;
  pressed?: Boolean;
  onPress?: () => void;
}

const Header = ({onPress, date}: Props): JSX.Element => {
  const {user} = useSelector((state: RootState) => state.user);
  return (
    <View style={styles.top}>
      <View style={styles.greeting}>
        <Text style={[styles.text, {fontSize: 20}]}>Hello, </Text>
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.datePicker}>
        <Text style={[styles.text, {marginRight: 8, fontSize: 16}]}>
          View for
        </Text>
        <DatePicker onPress={onPress} date={date} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  top: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Sizes.globalPadding,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: '400',
  },
});
