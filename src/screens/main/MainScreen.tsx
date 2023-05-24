import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import InsightsScreen from './InsightsScreen';
import AccountScreen from './AccountScreen';
import {Colors} from '../../configs/colors';
import GoalScreen from './GoalScreen';
import {Sizes} from '../../configs/sizes';

const BottomTab = createBottomTabNavigator();

const MaiScreen = (): JSX.Element => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.dark,
          height: 54,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          // zIndex: 1,
          // position: 'absolute',
        },
        tabBarActiveTintColor: Colors.theme,
        tabBarInactiveTintColor: Colors.white,
        tabBarLabelStyle: {fontSize: 16},
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              color={focused ? Colors.theme : Colors.white}
              size={Sizes.icon}
            />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="InsightsScreen"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="chart-bar"
              color={focused ? Colors.theme : Colors.white}
              size={Sizes.icon}
            />
          ),
          tabBarLabel: 'Insights',
        }}
      />
      <BottomTab.Screen
        name="GoalScreen"
        component={GoalScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="target"
              color={focused ? Colors.theme : Colors.white}
              size={Sizes.icon}
            />
          ),
          tabBarLabel: 'Goal',
        }}
      />
      <BottomTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="account"
              color={focused ? Colors.theme : Colors.white}
              size={Sizes.icon}
            />
          ),
          tabBarLabel: 'Account',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MaiScreen;

const styles = StyleSheet.create({
  container: {},
});
