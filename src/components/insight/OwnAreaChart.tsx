import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
  ViewStyle,
} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import HeaderOfChart from './HeaderOfChart';
import Expense from '../../interfaces/Expense';
import LoadingOverlay from '../ui/LoadingOverlay';
import {Spending} from '../../interfaces/Spending';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';
import {getSpendingStatistic} from '../../utils/functions/api/spending';

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
    <View
      style={{
        width: 70,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{color: Colors.dark, fontWeight: 'bold', textAlign: 'center'}}>
        {val}
      </Text>
    </View>
  );
};

const width = Dimensions.get('screen').width;

type DataType = 'EXPENSE' | 'INCOME';
interface Props {
  title?: String;
  type: DataType;
  containerStyle?: ViewStyle;
}

const OwnAreaChart = ({title = '', type, containerStyle}: Props) => {
  const {user} = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<any>([]);
  const [counter, setCounter] = useState(4);
  const [loading, setLoading] = useState(false);
  // console.log(data);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getSpendingStatistic(
          user.id,
          user.token,
          `num=${counter}`,
        );
        setData(response);
      } catch (error) {
        console.log(error);
        Alert.alert('Something went wrong!', 'Try again later!');
      }
      setLoading(false);
    })();
  }, [counter]);

  const convertDataToChartData = (data: Spending[]) => {
    return data.map((item: Spending) => {
      return {
        value: type === 'INCOME' ? item.income / 1000 : item.expense / 1000,
        label: 'test',
        labelComponent: () =>
          customLabel(
            new Intl.DateTimeFormat('en-GA', {
              year: '2-digit',
              month: 'short',
            }).format(new Date(item.year, item.month - 1)),
          ),
        customDataPoint: customDataPoint,
      };
    });
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <HeaderOfChart
        title={title}
        value={counter}
        onChangeValue={val => setCounter(val)}
      />
      <View style={{height: 250}}>
        {loading ? (
          <LoadingOverlay style={{backgroundColor: Colors.white}} />
        ) : (
          <LineChart
            thickness={4}
            color={Colors.dark}
            // maxValue={3000}
            noOfSections={3}
            areaChart
            yAxisTextStyle={{color: Colors.dark}}
            data={convertDataToChartData(data)}
            curved
            startFillColor={Colors.theme}
            endFillColor={Colors.theme200}
            startOpacity={0.4}
            endOpacity={0.4}
            spacing={data.length <= 4 ? width / data.length : 120}
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
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Expense in {counter} lastest month</Text>
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
