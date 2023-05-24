import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';

interface Props {
  check: Boolean;
  onPress: () => void;
}

const CheckBox = ({check, onPress}: Props): JSX.Element => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        {check && (
          <Icon
            name="check"
            size={Sizes.icon}
            color={Colors.dark}
            onPress={onPress}
          />
        )}
      </View>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    height: 28,
    width: 28,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
});
