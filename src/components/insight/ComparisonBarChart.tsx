import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import HeaderOfChart from './HeaderOfChart';

const INCOMES = [
  {
    month: 1,
    year: 2023,
    income: 2500000,
  },
  {
    month: 2,
    year: 2023,
    income: 2500000,
  },
  {
    month: 3,
    year: 2023,
    income: 2500000,
  },
  {
    month: 4,
    year: 2023,
    income: 2500000,
  },
  {
    month: 4,
    year: 2023,
    income: 2500000,
  },
  {
    month: 4,
    year: 2023,
    income: 2500000,
  },
];
const EXPENSES = [
  {
    month: 1,
    year: 2023,
    expense: 2320000,
  },
  {
    month: 2,
    year: 2023,
    expense: 2180000,
  },
  {
    month: 3,
    year: 2023,
    expense: 1760000,
  },
  {
    month: 4,
    year: 2023,
    expense: 3200000,
  },
  {
    month: 4,
    year: 2023,
    expense: 1590000,
  },
  {
    month: 4,
    year: 2023,
    expense: 2430000,
  },
];

const convertIncomeDataToChartData = (data: any) =>
  data.map((item: any) => {
    return {
      value: item.income / 1000,
      label: new Intl.DateTimeFormat('en-GA', {
        month: 'short',
      }).format(new Date(item.year, item.month)),
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: Colors.dark},
      frontColor: Colors.theme,
      barWidth: 25,
    };
  });

const convertExpenseDataToChartData = (data: any) =>
  data.map((item: any) => {
    return {value: item.expense / 1000, frontColor: Colors.red, barWidth: 25};
  });

const incomes = convertIncomeDataToChartData(INCOMES);
const expenses = convertExpenseDataToChartData(EXPENSES);

const mergeIncomesAndExpenses = (incomes: any, expenses: any) => {
  const result = [];
  for (let i = 0; i < incomes.length; i++) {
    result.push(incomes[i], expenses[i]);
  }
  return result;
};

const ComparisionBarChart = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(1);

  return (
    <View style={styles.container}>
      <HeaderOfChart title="my comparison" />
      <View style={styles.titles}>
        <View style={styles.itemTitleContainer}>
          <View style={[styles.thumb, {backgroundColor: Colors.theme}]} />
          <Text style={styles.title}>Income</Text>
        </View>
        <View style={styles.itemTitleContainer}>
          <View style={[styles.thumb, {backgroundColor: Colors.red}]} />
          <Text style={styles.title}>Expense</Text>
        </View>
      </View>
      <BarChart
        data={mergeIncomesAndExpenses(incomes, expenses)}
        barWidth={8}
        spacing={24}
        hideRules={true}
        yAxisTextStyle={{color: Colors.dark, marginLeft: 8}}
        xAxisColor={Colors.dark}
        yAxisColor={Colors.dark}
        noOfSections={3}
        // maxValue={75}
      />

      <View style={styles.name}>
        <Text style={styles.title}>Income and Expense in 5 latest month</Text>
      </View>
    </View>
  );
};

export default ComparisionBarChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Sizes.globalPadding + 8,
    backgroundColor: Colors.white,
    // borderRadius: 12,
  },
  titles: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemTitleContainer: {
    flexDirection: 'row',
  },
  title: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: '500',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  name: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
