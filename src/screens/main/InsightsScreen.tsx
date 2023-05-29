import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {Sizes} from '../../configs/sizes';
import ComparisionBarChart from '../../components/insight/ComparisonBarChart';
import OwnAreaChart from '../../components/insight/OwnAreaChart';
import Expense from '../../interfaces/Expense';
import {getOwnExpenses} from '../../utils/functions/api/expense';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';
import {getSpendingStatistic} from '../../utils/functions/api/spending';
import {Spending} from '../../interfaces/Spending';

const InsightsScreen = (): JSX.Element => {
  const {user} = useSelector((state: RootState) => state.user);

  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Insights',
      tabBarIcon: ({focused}) => (
        <Icon
          name="chart-bar"
          color={focused ? Colors.theme : Colors.white}
          size={Sizes.icon}
        />
      ),
      headerShown: false,
      headerTitle: 'Statistic',
      headerTintColor: Colors.white,
      headerTitleStyle: {fontSize: 24, fontWeight: 'bold'},
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.dark,
        borderBottomRightRadius: Sizes.globalBorderRadius,
        borderBottomLeftRadius: Sizes.globalBorderRadius,
      },
    });
  }, []);
  const [loading, setLoading] = useState(false);

  // Get expenses by month from server

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>STATISTIC</Text>
      </View>
      <ComparisionBarChart containerStyle={{flex: 0.3}} />
      <OwnAreaChart
        title="my income"
        type="INCOME"
        containerStyle={{flex: 0.3}}
      />
      <OwnAreaChart
        title="my expense"
        type="EXPENSE"
        containerStyle={{flex: 0.3}}
      />
    </ScrollView>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
    // padding: Sizes.globalPadding + 8,
  },
  headerContainer: {
    flex: 0.1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.theme,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
