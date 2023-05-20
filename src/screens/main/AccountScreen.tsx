import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';

const AccountScreen = (): JSX.Element => {
  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Account',
      tabBarIcon: ({focused}) => (
        <Icon
          name="account"
          color={focused ? Colors.theme : Colors.white}
          size={30}
        />
      ),
    });
  }, []);
  return (
    <View>
      <Text>Account Screen</Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {},
});
