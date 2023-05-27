import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import MonthPicker from 'react-native-month-year-picker';

const GoalScreen = (): JSX.Element => {
  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Goal',
      tabBarIcon: ({focused}) => (
        <Icon
          name="target"
          color={focused ? Colors.theme : Colors.white}
          size={Sizes.icon}
        />
      ),
    });
  }, []);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback(
    (value: boolean | ((prevState: boolean) => boolean)) => setShow(value),
    [],
  );
  const onValueChange = useCallback(
    (_event: any, newDate: Date) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <View>
      <Text>{date.toString()}</Text>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="vn-VN"
        />
      )}
    </View>
  );
};
//   return (
//     <View>
//       <Text>Goal Screen</Text>
//     </View>
//   );
// };

export default GoalScreen;

const styles = StyleSheet.create({
  container: {},
});
