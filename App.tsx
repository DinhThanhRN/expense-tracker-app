import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from './src/configs/colors';
import axios from 'axios';

const App = (): JSX.Element => {
  useEffect(() => {
    axios
      .get('localhost:3000/api/v1/users')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
