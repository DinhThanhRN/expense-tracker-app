import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DateData} from 'react-native-calendars';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import Statistics from '../../components/home/Statistics';
import List from '../../components/home/List';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';
import {createPlainAlert} from '../../components/error/createPlainAlert';
import {
  getOwnExpenses,
  getExpensesByCategory,
} from '../../utils/functions/communicateAPI';
import Header from '../../components/home/Header';
import MyCalendar from '../../components/home/MyCalendar';

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarIcon: ({focused}) => (
        <Icon
          name="home"
          color={focused ? Colors.theme : Colors.white}
          size={30}
        />
      ),
      tabBarLabel: 'Home',
    });
  }, []);

  const {user} = useSelector((state: RootState) => state.user);

  const [category, setCategory] = useState<any>('All');
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [queryString, setQueryString] = useState('');
  const now = new Date();

  const date = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    timestamp: now.getTime(),
    dateString: now.toISOString().substring(0, now.toISOString().indexOf('T')),
  };
  const [day, setDay] = useState<DateData>(date);
  useEffect(() => {
    setLoading(true);
    try {
      if (category === 'All')
        getOwnExpenses(user.id, user.token, queryString).then(response =>
          setData(response),
        );
      else {
        getExpensesByCategory(user.id, user.token, category, queryString).then(
          response => setData(response),
        );
      }
    } catch (error) {
      createPlainAlert('Loading your expenses fail!', 'Try again');
    }
    setLoading(false);
  }, [category, day, queryString]);
  // console.log(day);
  return (
    <View style={styles.container}>
      <Header onPress={() => setOpenCalendar(true)} date={day} />
      {/* <TouchableWithoutFeedback
        style={{flex: 0.9}}
        onPress={() => setOpenCalendar(false)}> */}
      <View style={openCalendar ? {flex: 0.9, opacity: 0.6} : {flex: 0.9}}>
        <Statistics containerStyle={{flex: 0.45}} />
        <List
          data={data}
          containerStyle={{flex: 0.55}}
          onPress={text => setCategory(text)}
        />
      </View>
      {/* </TouchableWithoutFeedback> */}
      {openCalendar && (
        <MyCalendar
          date={date}
          onReset={() => {
            setQueryString('');
            setOpenCalendar(false);
          }}
          onPress={day => {
            setDay(day);
            setQueryString(`month=${day?.month}&year=${day?.year}`);
          }}
          onClose={() => setOpenCalendar(false)}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
  },
});
