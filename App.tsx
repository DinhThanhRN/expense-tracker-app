import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from './src/configs/colors';

const App = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Hello Thanh ga</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
