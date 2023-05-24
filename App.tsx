import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {Colors} from './src/configs/colors';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupSceen';
import {store} from './src/reducers/store';
import MaiScreen from './src/screens/main/MainScreen';
import TransactionEditor from './src/screens/main/TransactionEditor';
import PasswordResetScreen from './src/screens/auth/PasswordResetScreen';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="MainScreen" component={MaiScreen} />
          <Stack.Screen
            name="TransactionEditorScreen"
            component={TransactionEditor}
          />
          <Stack.Screen
            name="PasswordResetScreen"
            component={PasswordResetScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
