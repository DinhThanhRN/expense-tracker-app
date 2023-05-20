import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';

import {Colors} from '../../configs/colors';
import Chart from './Chart';
import {Sizes} from '../../configs/sizes';
import {statisticExpense} from '../../utils/functions/communicateAPI';
import {RootState} from '../../reducers/store';
import {createPlainAlert} from '../error/createPlainAlert';
import {CATEGORIES} from '../../data/category';

interface Props {
  containerStyle?: ViewStyle;
}

const Statistics = ({containerStyle}: Props): JSX.Element => {
  const {user} = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    statisticExpense(user.id, user.token)
      .then(response => {
        const temp = response.map((item: any) => {
          const color = CATEGORIES.find(
            category => category.name === item.category,
          )?.color;
          return {value: item.spending, text: item.category, color};
        });
        setData(temp);
      })
      .catch(err =>
        createPlainAlert('Get statistic fail!', 'Please try again'),
      );
  }, []);
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.sumContainer}>
        <View style={styles.sum}>
          <Text style={{fontSize: 16, color: Colors.white}}>Income</Text>
          <Text style={styles.money}>$10.000.00</Text>
        </View>
        <View style={styles.sum}>
          <Text style={{fontSize: 16, color: Colors.white}}>Income</Text>
          <Text style={styles.money}>$10.000.00</Text>
        </View>
      </View>
      <Chart data={data} />
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.globalPadding,
  },
  sumContainer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
  },
  sum: {
    width: '50%',
    backgroundColor: Colors.theme200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  money: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
