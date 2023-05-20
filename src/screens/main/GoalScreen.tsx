import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';

const GoalScreen = (): JSX.Element => {
  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Goal',
      tabBarIcon: ({focused}) => (
        <Icon
          name="target"
          color={focused ? Colors.theme : Colors.white}
          size={30}
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
