import React from 'react';
import {View, Text, StyleSheet, SectionList, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Expense from '../../interfaces/Expense';
import {CATEGORIES} from '../../data/category';
import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import {formatDate, formatNumber} from '../../utils/functions/formater';
import OverlayButton from '../ui/OverlayButton';

interface ExpensesWithSameDate {
  date: String;
  data: [Expense];
}

interface Props {
  data: [ExpensesWithSameDate];
  containerStyle?: ViewStyle;
}

const ListOfExpenses = ({data, containerStyle}: Props): JSX.Element => {
  const renderItem = ({item}: any) => {
    const category = CATEGORIES.find(
      category => category.name === item.category,
    );
    return (
      <View style={styles.itemContainer}>
        <View style={styles.infor}>
          <View style={styles.icon}>
            {category?.icon && (
              <Icon name={category.icon} color={Colors.theme} size={28} />
            )}
          </View>
          <View style={styles.nameAndPriceContainer}>
            <Text style={styles.name}>{item.paidFor}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </View>

        <Text style={styles.price}>{formatNumber(item.price)}</Text>
      </View>
    );
  };
  const renderSectionHeader = ({section: {date}}: any) => {
    return <Text style={styles.date}>{formatDate(date)}</Text>;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <OverlayButton icon="plus" style={styles.button} />
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListOfExpenses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.globalPadding,
  },
  itemContainer: {
    height: 64,
    width: '100%',
    paddingBottom: 12,
    marginTop: Sizes.globalPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#def8ed',
    borderRadius: 12,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b1b1b1',
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
  button: {
    zIndex: 1,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
});
