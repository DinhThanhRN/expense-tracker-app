import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../configs/colors';

interface Props {
  message?: String;
  // backgroundColor?: string;
  style?: ViewStyle;
}

const LoadingOverlay = ({message, style}: Props): JSX.Element => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.theme,
  },
  message: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '500',
  },
});
