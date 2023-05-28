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
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthOfExpenses, setMonthOfExpenses] = useState(0);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getOwnExpenses(
          user.id,
          user.token,
          monthOfExpenses !== 0 ? `month=${monthOfExpenses}` : '',
        );
        setExpenses(response);
      } catch (error) {
        console.log(error);
        Alert.alert('Something went wrong!', 'Try again later!');
      }
      setLoading(false);
    })();
  }, [monthOfExpenses]);
  console.log(expenses);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>STATISTIC</Text>
      </View>
      <ComparisionBarChart />
      <OwnAreaChart
        month={monthOfExpenses}
        onChangeMonth={month => setMonthOfExpenses(month)}
        loading={loading}
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
