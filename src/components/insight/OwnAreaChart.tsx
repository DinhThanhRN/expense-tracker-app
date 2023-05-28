import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import HeaderOfChart from './HeaderOfChart';
import Expense from '../../interfaces/Expense';
import LoadingOverlay from '../ui/LoadingOverlay';

interface Props {
  data?: Expense[];
  month?: number;
  onChangeMonth?: (month: number) => void;
  loading?: boolean;
}

const DATA = [
  {
    month: 1,
    year: 2023,
    totalAmmount: 2320000,
  },
  {
    month: 2,
    year: 2023,
    totalAmmount: 2180000,
  },
  {
    month: 3,
    year: 2023,
    totalAmmount: 1760000,
  },
  {
    month: 4,
    year: 2023,
    totalAmmount: 3200000,
  },
  {
    month: 5,
    year: 2023,
    totalAmmount: 1590000,
  },
  {
    month: 6,
    year: 2023,
    totalAmmount: 2430000,
  },
];
const customDataPoint = () => {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: Colors.white,
        borderWidth: 4,
        borderRadius: 10,
        borderColor: Colors.dark,
      }}
    />
  );
};
const customLabel = (val: any) => {
  return (
    <View style={{width: 70, marginLeft: 7}}>
      <Text style={{color: Colors.dark, fontWeight: 'bold'}}>{val}</Text>
    </View>
  );
};
const convertDataToChartData = (data: any) => {
  return data.map((item: any) => {
    return {
      value: item.totalAmmount / 1000,
      labelComponent: () =>
        customLabel(
          new Intl.DateTimeFormat('en-GA', {
            year: 'numeric',
            month: 'short',
          }).format(new Date(item.year, item.month)),
        ),
      customDataPoint: customDataPoint,
    };
  });
};

console.log(convertDataToChartData(DATA));

const OwnAreaChart = ({
  data,
  month,
  onChangeMonth = () => {},
  loading,
}: Props) => {
  const sampleDate: any = [
    {
      value: 100,
      labelComponent: () => customLabel('22 Nov'),
      customDataPoint: customDataPoint,
    },
    {
      value: 140,
      hideDataPoint: true,
    },
    {
      value: 250,
      customDataPoint: customDataPoint,
    },
    {
      value: 290,
      hideDataPoint: true,
    },
    {
      value: 410,
      labelComponent: () => customLabel('24 Nov'),
      customDataPoint: customDataPoint,
    },
    {
      value: 440,
      hideDataPoint: true,
    },
    {
      value: 300,
      customDataPoint: customDataPoint,
    },
    {
      value: 280,
      hideDataPoint: true,
    },
    {
      value: 180,
      labelComponent: () => customLabel('26 Nov'),
      customDataPoint: customDataPoint,
    },
    {
      value: 150,
      hideDataPoint: true,
    },
    {
      value: 150,
      customDataPoint: customDataPoint,
    },
  ];
  if (loading) return <LoadingOverlay />;
  return (
    <View style={styles.container}>
      <HeaderOfChart
        title="expense"
        value={month}
        onChangeValue={val => onChangeMonth(val)}
      />
      <LineChart
        thickness={4}
        color={Colors.dark}
        // maxValue={600}
        noOfSections={3}
        areaChart
        yAxisTextStyle={{color: Colors.dark}}
        data={convertDataToChartData(DATA)}
        curved
        startFillColor={Colors.theme}
        endFillColor={Colors.theme200}
        startOpacity={0.4}
        endOpacity={0.4}
        spacing={80}
        // backgroundColor="#414141"
        rulesColor="gray"
        rulesType="solid"
        initialSpacing={10}
        yAxisColor={Colors.dark}
        xAxisColor={Colors.dark}
        dataPointsHeight={20}
        dataPointsWidth={20}
        // pointerConfig={{
        //   pointerStripUptoDataPoint: true,
        //   pointerStripColor: Colors.dark,
        //   pointerStripWidth: 2,
        //   strokeDashArray: [2, 5],
        //   pointerColor: 'lightgray',
        //   radius: 4,
        //   pointerLabelWidth: 100,
        //   pointerLabelHeight: 120,
        //   pointerLabelComponent: (items: any) => {
        //     return (
        //       <View style={styles.pointerLabel}>
        //         <Text>{items[0].value}</Text>
        //       </View>
        //     );
        //   },
        // }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Expense in {month} lastest month</Text>
      </View>
    </View>
  );
};

export default OwnAreaChart;

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    paddingBottom: 70,
    paddingHorizontal: Sizes.globalPadding,
    backgroundColor: Colors.white,
    // borderRadius: Sizes.globalBorderRadius + 8,
  },

  titleContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    right: 0,
    left: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  pointerLabel: {
    height: 120,
    width: 100,
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 16,
  },
});
