import React from 'react';
import {View, Text, StyleSheet, ViewStyle, ScrollView} from 'react-native';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import ListOfCategories from './ListOfCategories';
import ListOfExpenses from './ListOfExpenses';
import {groupExpensesWithSameDate} from '../../utils/functions/formater';
import Expense from '../../interfaces/Expense';
import LoadingOverlay from '../ui/LoadingOverlay';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';

interface Props {
  loading?: Boolean;
  data: [Expense];
  containerStyle?: ViewStyle;
  onPress: (category: String) => void;
}

const List = ({data, loading, containerStyle, onPress}: Props): JSX.Element => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ListOfCategories onPress={onPress} containerStyle={{flex: 0.25}} />
      {loading ? (
        <LoadingOverlay style={styles.overlay} />
      ) : (
        <ListOfExpenses
          data={groupExpensesWithSameDate(data)}
          containerStyle={{flex: 0.75}}
        />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: Sizes.globalPadding,
    bottom: 0,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  overlay: {
    flex: 0.75,
    marginTop: 4,
    backgroundColor: Colors.white,
  },
});
