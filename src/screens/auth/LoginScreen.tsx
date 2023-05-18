import React, {useState, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Sizes} from '../../configs/sizes';
import {Colors} from '../../configs/colors';
import Input from '../../components/ui/Input';
import FlatButton from '../../components/ui/FlatButton';
import CheckBox from '../../components/ui/CheckBox';
import PressableText from '../../components/ui/PressableText';
import {NavigationProps} from '../../types/NavigationProps';
import {createPlainAlert} from '../../components/error/createPlainAlert';
import {login} from '../../services/auth';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

type CheckingActionType = 'EMAIL' | 'PASSWORD';

type CredentialCheckerState = {
  invalidEmail: Boolean;
  invalidPassword: Boolean;
};
type CredentialCheckingAction = {
  type: CheckingActionType;
};

const LoginScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProps>();

  const [inputs, setInputs] = useState<any>({email: '', password: ''});
  const [checked, setChecked] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(false);

  const reducer = (
    state: CredentialCheckerState,
    action: CredentialCheckingAction,
  ) => {
    switch (action.type) {
      case 'EMAIL':
        if (
          !(
            inputs.email &&
            inputs.email.includes('@') &&
            inputs.email.includes('.')
          )
        )
          return {...state, invalidEmail: true};
        return {...state, invalidEmail: false};
      case 'PASSWORD':
        const password = inputs.password;
        if (password === '' || password.length < 8)
          return {...state, invalidPassword: true};
        return {...state, invalidPassword: false};
      default:
        return state;
    }
  };
  const initialChecker: CredentialCheckerState = {
    invalidEmail: false,
    invalidPassword: false,
  };
  const [invalidCredentialsChecker, checkInvalidCredentials] = useReducer(
    reducer,
    initialChecker,
  );

  const handleLoggingIn = async () => {
    checkInvalidCredentials({type: 'EMAIL'});
    checkInvalidCredentials({type: 'PASSWORD'});
    if (
      invalidCredentialsChecker.invalidEmail ||
      invalidCredentialsChecker.invalidPassword
    ) {
      createPlainAlert(
        'Invalid email or password',
        'Please check your credentials!',
      );
    } else {
      setAuthenticating(true);
      try {
        const response = await login(inputs);
        console.log(response);
      } catch (error: any) {
        const response = error.response;
        if (response.status === 401)
          createPlainAlert(
            response.data.error.errorMessage,
            'Please check your credential!',
          );
      }
      setAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Logging in ..." />;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Input
          label="Email"
          placeholder="Type your email"
          errorMessage={invalidCredentialsChecker.invalidEmail && 'Wrong email'}
          inputProps={{
            defaultValue: inputs.email,
            onChangeText: (text: String) => setInputs({...inputs, email: text}),
            onEndEditing: () => checkInvalidCredentials({type: 'EMAIL'}),
          }}
        />
        <Input
          label="Password"
          placeholder="Type your password"
          errorMessage={
            invalidCredentialsChecker.invalidPassword && 'Wrong password'
          }
          secure={true}
          inputProps={{
            defaultValue: inputs.password,
            onChangeText: (text: String) =>
              setInputs({...inputs, password: text}),
            onEndEditing: () => checkInvalidCredentials({type: 'PASSWORD'}),
          }}
        />
        <View style={styles.functionContainer}>
          <View style={{flexDirection: 'row'}}>
            <CheckBox check={checked} onPress={() => setChecked(!checked)} />
            <Text style={styles.text}>Remenber me</Text>
          </View>
          <PressableText>Reset password</PressableText>
        </View>
        <FlatButton label="Login" onPress={handleLoggingIn} />
        <View style={styles.bottom}>
          <Text style={styles.text}>Don't have account?</Text>
          <PressableText onPress={() => navigation.navigate('SignupScreen')}>
            Sign up
          </PressableText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.globalPadding,
    backgroundColor: Colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  functionContainer: {
    width: '90%',
    marginVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom: {
    bottom: 12,
    position: 'absolute',
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 6,
    fontSize: 18,
    color: Colors.white,
    fontWeight: '500',
  },
});
