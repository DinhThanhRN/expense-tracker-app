import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ViewStyle,
  RefreshControl,
} from 'react-native';

import Expense from '../../interfaces/Expense';
import {Sizes} from '../../configs/sizes';
import {formatDate, formatNumber} from '../../utils/functions/formater';
import OverlayButton from '../ui/OverlayButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/NavigationProps';
import ExpenseItem from '../ui/ExpenseItem';

interface ExpensesWithSameDate {
  date: String;
  data: [Expense];
}

interface Props {
  data: [ExpensesWithSameDate];
  containerStyle?: ViewStyle;
}

const ListOfExpenses = ({data, containerStyle}: Props): JSX.Element => {
  const navigation = useNavigation<NavigationProps>();

  const renderItem = ({item}: any) => {
    return <ExpenseItem expense={item} />;
  };
  const renderSectionHeader = ({section: {date}}: any) => {
    return <Text style={styles.date}>{formatDate(date)}</Text>;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <OverlayButton
        icon="plus"
        style={styles.button}
        onPress={() => navigation.navigate('TransactionEditorScreen')}
      />
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
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b1b1b1',
  },

  button: {
    zIndex: 1,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
});
