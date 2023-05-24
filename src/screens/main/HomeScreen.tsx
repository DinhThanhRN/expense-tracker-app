import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DateData} from 'react-native-calendars';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import Statistics from '../../components/home/Statistics';
import List from '../../components/home/List';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../reducers/store';
import {createPlainAlert} from '../../components/error/createPlainAlert';
import {
  getOwnExpenses,
  getExpensesByCategory,
} from '../../utils/functions/communicateAPI';
import Header from '../../components/home/Header';
import MyCalendar from '../../components/ui/MyCalendar';
import {UserState} from '../../reducers/user';
import {setExpenses} from '../../reducers/expense';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<BottomTabProps>();
  const index = useNavigationState(state => state.index);

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

  const {user}: UserState = useSelector((state: RootState) => state.user);
  const {expenses} = useSelector((state: RootState) => state.expense);
  const dispatch = useDispatch<AppDispatch>();

  const [category, setCategory] = useState<any>('All');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
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

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dy > 0 && gestureState.dy > gestureState.dx;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          console.log('Vuốt từ trên xuống');
          setRefresh(true);
          setTimeout(async () => {
            setRefresh(false);
          }, 2000);
        }
      },
    }),
  ).current;

  const loadData = async () => {
    setLoading(true);
    try {
      if (category === 'All') {
        const response = await getOwnExpenses(user.id, user.token, queryString);
        dispatch(setExpenses(response));
      } else {
        const response = await getExpensesByCategory(
          user.id,
          user.token,
          category,
          queryString,
        );
        dispatch(setExpenses(response));
      }
    } catch (error) {
      createPlainAlert('Loading your expenses fail!', 'Try again');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [category, day, queryString, index]);
  if (refresh) return <LoadingOverlay />;
  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Header onPress={() => setOpenCalendar(true)} date={day} />
      {/* <TouchableWithoutFeedback
        style={{flex: 0.9}}
        onPress={() => setOpenCalendar(false)}> */}
      <View style={openCalendar ? {flex: 0.9, opacity: 0.6} : {flex: 0.9}}>
        <Statistics containerStyle={{flex: 0.45}} />
        <List
          loading={loading}
          data={expenses}
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
          onClose={day => {
            setOpenCalendar(false);
            setDay(day);
            setQueryString(`month=${day?.month}&year=${day?.year}`);
          }}
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