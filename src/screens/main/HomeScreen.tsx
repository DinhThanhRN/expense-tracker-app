import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {View, StyleSheet, PanResponder, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MonthPicker from 'react-native-month-year-picker';
import messaging from '@react-native-firebase/messaging';

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
} from '../../utils/functions/api/expense';
import Header from '../../components/home/Header';
import {UserState, removeUser} from '../../reducers/user';
import {setExpenses} from '../../reducers/expense';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {Sizes} from '../../configs/sizes';

const HomeScreen = (): JSX.Element => {
  const {user}: UserState = useSelector((state: RootState) => state.user);
  const {expenses} = useSelector((state: RootState) => state.expense);
  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation<BottomTabProps>();
  const index = useNavigationState(state => state.index);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from the background',
        remoteMessage.data,
        remoteMessage.notification,
      );
      navigation.navigate('NotificationScreen');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage)
          console.log(
            'Notification caused app to open from quit state: ',
            remoteMessage.notification,
          );
      });
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarIcon: ({focused}) => (
        <Icon
          name="home"
          color={focused ? Colors.theme : Colors.white}
          size={Sizes.icon}
        />
      ),
      tabBarLabel: 'Home',
    });
  }, []);

  const [category, setCategory] = useState<any>('All');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const showDatePicker = useCallback(
    (value: boolean | ((prevState: boolean) => boolean)) =>
      setShowPicker(value),
    [],
  );
  const onDateChange = useCallback(
    (_event: any, newDate: Date) => {
      const selectedDate = newDate || date;
      showDatePicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

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
        const response = await getOwnExpenses(
          user.id,
          user.token,
          `month=${date.getMonth() + 1}&year=${date.getFullYear()}`,
        );
        dispatch(setExpenses(response));
      } else {
        const response = await getExpensesByCategory(
          user.id,
          user.token,
          category,
          `month=${date.getMonth() + 1}&year=${date.getFullYear()}`,
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
  }, [category, date, index]);
  if (refresh) return <LoadingOverlay />;
  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Header onPress={() => setShowPicker(true)} date={date} />
      <View style={{flex: 0.9}}>
        <Statistics time={date} containerStyle={{flex: 0.45}} />
        <List
          loading={loading}
          data={expenses}
          containerStyle={{flex: 0.55}}
          onPress={text => setCategory(text)}
        />
      </View>
      {showPicker && <MonthPicker value={date} onChange={onDateChange} />}
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
