import React, {ReactNode, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';

import {Sizes} from '../../configs/sizes';
import {Colors} from '../../configs/colors';
import Input from '../../components/ui/Input';
import ListOfCategories from '../../components/home/ListOfCategories';
import FlatButton from '../../components/ui/FlatButton';
import MyCalendar from '../../components/ui/MyCalendar';
import {DateData} from 'react-native-calendars';
import {formatDate} from '../../utils/functions/formater';
import Expense from '../../interfaces/Expense';
import {createPlainAlert} from '../../components/error/createPlainAlert';
import {
  createNewExpense,
  deleteExpense,
  editExpense,
} from '../../utils/functions/communicateAPI';
import {AppDispatch, RootState} from '../../reducers/store';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {NavigationProps} from '../../types/NavigationProps';
import {
  ExpensesState,
  addExpense,
  removeExpense,
  updateExpense,
} from '../../reducers/expense';
import IconButton from '../../components/ui/IconButton';

const isISOString = (str: string): Boolean => {
  const date = new Date(str);
  return date.toISOString().startsWith(str);
};
const convertToDateDataType = (str: String): DateData => {
  const date = new Date(str.toString());
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    timestamp: date.getTime(),
    dateString: str.toString(),
  };
};

const TransactionEditor = (): JSX.Element => {
  const {user} = useSelector((state: RootState) => state.user);
  const {expenses}: ExpensesState = useSelector(
    (state: RootState) => state.expense,
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<any>();

  const expenseId = route.params?.id;
  const editedExpense = expenses.find(item => item._id === expenseId);
  const isEdited = !!editedExpense;

  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    timestamp: new Date().getTime(),
    dateString: new Date()
      .toISOString()
      .substring(0, new Date().toISOString().indexOf('T')),
  };

  const [inputs, setInputs] = useState<Expense>({
    paidAt: isEdited ? editedExpense.paidAt : today.dateString,
    paidFor: isEdited ? editedExpense.paidFor : '',
    price: isEdited ? editedExpense.price : 0,
    category: isEdited ? editedExpense.category : 'Study',
  });

  const [date, setDate] = useState<DateData>(
    isEdited ? convertToDateDataType(inputs.paidAt) : today,
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderRightIcon = (): ReactNode => {
    return <Icon name="calendar" color={Colors.theme} size={Sizes.icon} />;
  };

  const handleSummiting = async () => {
    console.log(inputs);
    // Check if inputs are invalid
    if (
      Number.isNaN(inputs.price) ||
      !inputs.category ||
      !inputs.paidFor ||
      !isISOString(inputs.paidAt.toString())
    ) {
      createPlainAlert(
        'Invalid information!',
        'Please check again your transaction.',
      );
    } else {
      setLoading(true);
      try {
        if (isEdited) {
          const response = await editExpense(expenseId, user.token, inputs);
          dispatch(updateExpense(response));
        } else {
          const response = await createNewExpense(user.id, user.token, inputs);
          dispatch(addExpense(response));
        }
        navigation.goBack();
      } catch (error) {
        createPlainAlert('Can not create new transaction!', 'Try again');
      }
      setLoading(false);
    }
  };
  const deleteTransaction = async () => {
    try {
      await deleteExpense(expenseId, user.token);

      dispatch(removeExpense({id: expenseId}));
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Deleting fail!', 'Can not delete the transaction!');
    }
  };

  if (loading) return <LoadingOverlay message="Uploading ..." />;
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={[
            styles.container,
            openCalendar && {backgroundColor: Colors.theme, opacity: 0.8},
          ]}
          behavior="height">
          {isEdited && (
            <IconButton
              name="delete"
              color="red"
              size={40}
              style={{position: 'absolute', right: 0, top: 0}}
              onPress={deleteTransaction}
            />
          )}
          <Input
            label={isEdited ? 'Edit Transaction' : 'Add Transaction'}
            labelStyle={styles.transactionLabel}
            containerStyle={styles.transactionContaner}
            inputContainerStyle={{
              borderBottomColor: Colors.normalText,
              borderBottomWidth: 2,
            }}
            inputProps={{
              placeholderColor: Colors.dark,
              style: styles.transaction,
              defaultValue: inputs.price + '',
              onChangeText: (text: string) =>
                setInputs({...inputs, price: +text}),
              keyboardType: 'numeric',
            }}
          />
          <ListOfCategories
            isContainAll={false}
            onPress={category => setInputs({...inputs, category})}
            containerStyle={styles.list}
            category={inputs.category}
          />
          <View style={styles.formContainer}>
            <Input
              label="Paid to"
              labelStyle={styles.formsLabel}
              containerStyle={styles.form}
              inputContainerStyle={{
                borderBottomColor: Colors.normalText,
                borderBottomWidth: 2,
              }}
              inputProps={{
                defaultValue: inputs.paidFor,
                style: [styles.transaction, {fontSize: 18}],
                onChangeText: (text: String) =>
                  setInputs({...inputs, paidFor: text}),
              }}
            />
            <Input
              label="Paid Date"
              labelStyle={styles.formsLabel}
              containerStyle={styles.form}
              inputContainerStyle={{
                borderBottomColor: Colors.normalText,
                borderBottomWidth: 2,
              }}
              rightIcon={renderRightIcon()}
              onPressRightIcon={() => setOpenCalendar(true)}
              inputProps={{
                style: [styles.transaction, {fontSize: 18}],
                value: formatDate(date.dateString),
                editable: false,
              }}
            />
            <View style={styles.buttonContaner}>
              <FlatButton
                label={isEdited ? 'Summit' : 'add transaction'}
                containerStyle={styles.button}
                onPress={handleSummiting}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {openCalendar && (
        <MyCalendar
          date={date}
          onClose={day => {
            setInputs({...inputs, paidAt: day.dateString});
            setOpenCalendar(false);
            setDate(day);
          }}
          style={{left: 20, right: 20}}
        />
      )}
    </>
  );
};

export default TransactionEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.globalPadding,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  transactionContaner: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
  },
  transactionLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  transaction: {
    width: '100%',
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.dark,
    height: '100%',
  },
  list: {
    flex: 0.2,
  },
  formContainer: {
    flex: 0.5,
  },
  form: {
    flex: 0.3,
    alignSelf: 'center',
  },
  formsLabel: {
    color: Colors.normalText,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContaner: {
    flex: 0.4,
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    height: '40%',
  },
});
