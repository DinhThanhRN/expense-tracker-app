import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../configs/colors';
import {CATEGORIES} from '../../data/category';
import {Sizes} from '../../configs/sizes';

interface Props {
  isContainAll?: Boolean;
  containerStyle?: ViewStyle;
  category?: String;
  onPress: (category: String) => void;
}

const ListOfCategories = ({
  category,
  isContainAll = true,
  containerStyle,
  onPress,
}: Props): JSX.Element => {
  const initialCategory = category ?? (isContainAll && 'All');
  const [focusedCategory, setFocusedCategory] = useState(initialCategory);

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.categoryContainer}>
        <Pressable
          style={
            focusedCategory === item.name
              ? [styles.category, {backgroundColor: Colors.theme}]
              : styles.category
          }
          onPress={() => {
            setFocusedCategory(item.name);
            onPress(item.name);
          }}>
          <Icon
            name={item.icon}
            color={focusedCategory === item.name ? Colors.white : '#97acc9'}
            size={Sizes.icon}
          />
        </Pressable>
        <Text
          style={
            focusedCategory === item.name
              ? [styles.text, {color: Colors.theme}]
              : styles.text
          }>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={
          isContainAll
            ? CATEGORIES
            : CATEGORIES.filter((_, index) => index !== 0)
        }
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ListOfCategories;

const styles = StyleSheet.create({
  container: {},
  categoryContainer: {
    width: 80,
    height: 70,
    alignItems: 'center',
  },
  category: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: Colors.normalText,
    fontSize: 14,
  },
});
