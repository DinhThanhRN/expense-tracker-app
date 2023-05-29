import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ViewStyle} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import HeaderOfChart from './HeaderOfChart';
import {Spending} from '../../interfaces/Spending';
import {getSpendingStatistic} from '../../utils/functions/api/spending';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';
import LoadingOverlay from '../ui/LoadingOverlay';

const convertDataToChartData = (data: any) =>
  data.map((item: any) => {
    return [
      {
        value: item.income / 1000,
        label: new Intl.DateTimeFormat('en-GA', {
          month: 'short',
          // year: '2-digit',
        }).format(new Date(item.year, item.month - 1)),
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: {color: Colors.dark},
        frontColor: Colors.theme,
        barWidth: 30,
      },
      {value: item.expense / 1000, frontColor: Colors.red, barWidth: 25},
    ];
  });

interface Props {
  containerStyle?: ViewStyle;
}

const ComparisionBarChart = ({containerStyle}: Props): JSX.Element => {
  const {user} = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<Spending[]>([]);
  const [counter, setCounter] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getSpendingStatistic(
          user.id,
          user.token,
          `&num=${counter}`,
        );
        setData(response);
      } catch (error) {
        console.log(error);
        Alert.alert('Something went wrong!');
      }
      setLoading(false);
    })();
  }, [counter]);

  return (
    <View style={[styles.container, containerStyle]}>
      <HeaderOfChart
        title="my comparison"
        value={counter}
        onChangeValue={val => setCounter(val)}
      />
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
      <View style={{height: 250, width: '100%'}}>
        {loading ? (
          <LoadingOverlay style={{backgroundColor: Colors.white}} />
        ) : (
          <BarChart
            data={convertDataToChartData(data).flat()}
            barWidth={8}
            spacing={24}
            hideRules={true}
            yAxisTextStyle={{color: Colors.dark, marginLeft: 8}}
            xAxisColor={Colors.dark}
            yAxisColor={Colors.dark}
            noOfSections={3}
            maxValue={3000}
          />
        )}
      </View>

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
    alignItems: 'center',
  },
  title: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: '500',
  },
  thumb: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 8,
  },
  name: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
