import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CATEGORIES} from '../../data/category';
import Expense from '../../interfaces/Expense';
import {Sizes} from '../../configs/sizes';
import {Colors} from '../../configs/colors';
import {formatNumber} from '../../utils/functions/formater';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/NavigationProps';

interface Props {
  expense: Expense;
}

const ExpenseItem = ({expense}: Props): JSX.Element => {
  const navigation = useNavigation<NavigationProps>();

  const category = CATEGORIES.find(
    category => category.name === expense.category,
  );
  return (
    <Pressable
      style={({pressed}) => [styles.container, pressed && {opacity: 0.5}]}
      onPress={() =>
        navigation.navigate('TransactionEditorScreen', {id: expense._id})
      }>
      <View style={styles.infor}>
        <View style={styles.icon}>
          {category?.icon && (
            <Icon name={category.icon} color={Colors.theme} size={28} />
          )}
        </View>
        <View style={styles.nameAndPriceContainer}>
          <Text style={styles.name}>{expense.paidFor}</Text>
          <Text style={styles.category}>{expense.category}</Text>
        </View>
      </View>

      <Text style={styles.price}>{formatNumber(expense.price)}</Text>
    </Pressable>
  );
};
export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: '100%',
    paddingBottom: 12,
    marginTop: Sizes.globalPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.normalText,
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#def8ed',
    borderRadius: 12,
  },
  infor: {
    flexDirection: 'row',
  },
  nameAndPriceContainer: {
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  category: {
    color: Colors.normalText,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    color: Colors.dark,
    fontWeight: 'bold',
  },
});
