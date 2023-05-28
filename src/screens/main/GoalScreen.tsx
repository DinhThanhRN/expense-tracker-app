import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import MonthPicker from 'react-native-month-year-picker';
import NumberPicker from '../../components/insight/NumberPicker';

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

  return (
    <View>
      <Text>Goal Screen</Text>
    </View>
  );
};

export default GoalScreen;

const styles = StyleSheet.create({
  container: {},
});
