import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

import {Colors} from '../../configs/colors';
import {formatNumber} from '../../utils/functions/formater';

interface ChartData {
  value: String;
  text: String;
  color: string;
}

interface Props {
  data: any;
}

const accumulateSpending = (data: any) =>
  data.reduce((acc: any, item: any) => acc + item.value, 0);

const Chart = ({data}: Props): JSX.Element => {
  const renderCenterLabel = () => (
    <View style={styles.centerLabel}>
      <Text style={{color: Colors.white}}>Total Spent</Text>
      <Text style={{color: Colors.white}}>Amount</Text>
      <Text style={styles.text}>{formatNumber(accumulateSpending(data))}</Text>
    </View>
  );
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.categoryContainer}>
        <View style={[styles.thumb, {backgroundColor: item.color}]} />
        <Text style={styles.text}>
          {item.text} {formatNumber(item.value)}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{paddingTop: 12}}>
        <PieChart
          donut={true}
          data={data}
          radius={90}
          strokeWidth={2}
          strokeColor={Colors.white}
          innerRadius={50}
          innerCircleColor={Colors.theme}
          innerCircleBorderWidth={2}
          innerCircleBorderColor={Colors.white}
          centerLabelComponent={renderCenterLabel}
        />
      </View>

      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  thumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
});
