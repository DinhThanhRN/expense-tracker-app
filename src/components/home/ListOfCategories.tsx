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

interface Props {
  containerStyle?: ViewStyle;
  onPress: (category: String) => void;
}

const ListOfCategories = ({containerStyle, onPress}: Props): JSX.Element => {
  const [focused, setFocused] = useState(0);

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.categoryContainer}>
        <Pressable
          style={
            focused === index
              ? [styles.category, {backgroundColor: Colors.theme}]
              : styles.category
          }
          onPress={() => {
            setFocused(index);
            onPress(item.name);
          }}>
          <Icon
            name={item.icon}
            color={focused === index ? Colors.white : '#97acc9'}
            size={30}
          />
        </Pressable>
        <Text
          style={
            focused === index
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
        data={CATEGORIES}
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
