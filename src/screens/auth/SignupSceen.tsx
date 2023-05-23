import React, {useReducer, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Sizes} from '../../configs/sizes';
import {Colors} from '../../configs/colors';
import Input from '../../components/ui/Input';
import FlatButton from '../../components/ui/FlatButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/NavigationProps';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {signup} from '../../services/auth';
import {createPlainAlert} from '../../components/error/createPlainAlert';

type CheckingActionType = 'EMAIL' | 'PASSWORD' | 'PASSWORDCONFIRM';
type RegistrationCheckerState = {
  invalidEmail: Boolean;
  invalidPassword: Boolean;
  invalidPasswordConfirm: Boolean;
};
type RegistrationCheckingAction = {
  type: CheckingActionType;
};

const SignupScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProps>();

  const [inputs, setInputs] = useState<any>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [isAuthenticating, setAuthenticating] = useState(false);

  const initialChecker: RegistrationCheckerState = {
    invalidEmail: false,
    invalidPassword: false,
    invalidPasswordConfirm: false,
  };
  const reducer = (
    state: RegistrationCheckerState,
    action: RegistrationCheckingAction,
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
      case 'PASSWORDCONFIRM':
        const passwordConfirm = inputs.passwordConfirm;
        if (passwordConfirm === '' || passwordConfirm.length < 8)
          return {...state, invalidPasswordConfirm: true};
        return {...state, invalidPasswordConfirm: false};
      default:
        return state;
    }
  };
  const [invalidRegistrationChecker, checkInvalidRegistration] = useReducer(
    reducer,
    initialChecker,
  );

  const handleSigningUp = async () => {
    checkInvalidRegistration({type: 'EMAIL'});
    checkInvalidRegistration({type: 'PASSWORD'});
    checkInvalidRegistration({type: 'PASSWORDCONFIRM'});
    if (
      invalidRegistrationChecker.invalidEmail ||
      invalidRegistrationChecker.invalidPassword ||
      invalidRegistrationChecker.invalidPasswordConfirm
    ) {
    } else {
      setAuthenticating(true);
      try {
        const response = await signup(inputs);
        console.log(response);
      } catch (error: any) {
        const err = error.response.data;
        if (
          err.error.errorMessage ===
          'Duplicate field value: test. Please use another value'
        )
          createPlainAlert(
            `${inputs.name} already exists.`,
            'Please use a different name!',
          );
        else if (err.error.errorMessage.includes('@'))
          createPlainAlert(
            `${inputs.email} already exists`,
            'Please use a different email!',
          );
        else if (err.error.errorMessage === 'Passwords are not the same!')
          createPlainAlert(
            err.error.errorMessage,
            'Please check your password!',
          );
        else
          createPlainAlert('Something went wrong', 'Check your registration!');
      }
      setAuthenticating(false);
    }
    navigation.goBack();
  };

  if (isAuthenticating) return <LoadingOverlay message="Signing up..." />;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Input
          label="Name"
          placeholder="Type your name"
          inputProps={{
            defaultValue: inputs.name,
            onChangeText: (text: String) => setInputs({...inputs, name: text}),
          }}
          inputContainerStyle={{borderRadius: 8}}
        />
        <Input
          label="Email"
          placeholder="Type your email"
          errorMessage={
            invalidRegistrationChecker.invalidEmail && 'Wrong email'
          }
          inputProps={{
            defaultValue: inputs.email,
            onChangeText: (text: String) => setInputs({...inputs, email: text}),
            onEndEditing: () => checkInvalidRegistration({type: 'EMAIL'}),
          }}
          inputContainerStyle={{borderRadius: 8}}
        />
        <Input
          label="Password"
          placeholder="Type your password"
          errorMessage={
            invalidRegistrationChecker.invalidPassword && 'Invalid password'
          }
          inputProps={{
            defaultValue: inputs.password,
            onChangeText: (text: String) =>
              setInputs({...inputs, password: text}),
            onEndEditing: () => checkInvalidRegistration({type: 'PASSWORD'}),
          }}
          secure={true}
          inputContainerStyle={{borderRadius: 8}}
        />
        <Input
          label="Confirm Password"
          placeholder="Type your password confirm"
          errorMessage={
            invalidRegistrationChecker.invalidPasswordConfirm &&
            'Password confirm is not compatible'
          }
          secure={true}
          inputContainerStyle={{borderRadius: 8}}
          inputProps={{
            defaultValue: inputs.passwordConfirm,
            onChangeText: (text: String) =>
              setInputs({...inputs, passwordConfirm: text}),
            onEndEditing: () =>
              checkInvalidRegistration({type: 'PASSWORDCONFIRM'}),
          }}
        />
        <FlatButton
          label="Sign up"
          containerStyle={{bottom: 16, position: 'absolute'}}
          onPress={handleSigningUp}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.globalPadding,
    backgroundColor: Colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    paddingHorizontal: 6,
    fontSize: 18,
    color: Colors.white,
    fontWeight: '500',
  },
});
