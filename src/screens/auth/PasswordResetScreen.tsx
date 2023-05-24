import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from '../../components/ui/Input';
import {Colors} from '../../configs/colors';
import FlatButton from '../../components/ui/FlatButton';
import {Sizes} from '../../configs/sizes';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/NavigationProps';
import {forgotPassword, resetPassword} from '../../services/auth';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';

interface HideState {
  resetToken: boolean;
  password: boolean;
}
type HideActionType = {type: 'RESET_TOKEN' | 'PASSWORD'};

interface InvalidCheckerState {
  email: Boolean;
  password: Boolean;
  passwordConfirm: Boolean;
  resetToken: Boolean;
}
type InvalidCheckingType = {
  type: 'EMAIL' | 'PASSWORD' | 'PASSWORD_CONFIRM' | 'RESET_TOKEN';
};

const PasswordResetScreen = (): JSX.Element => {
  const {user} = useSelector((state: RootState) => state.user);

  const navigation = useNavigation<NavigationProps>();

  const [inputs, setInputs] = useState<any>({
    email: '',
    password: '',
    passwordConfirm: '',
    resetToken: '',
  });
  const [loading, setLoading] = useState<Boolean>();

  const hiddenReducer = (state: HideState, action: HideActionType) => {
    switch (action.type) {
      case 'RESET_TOKEN':
        return {...state, resetToken: false};
      case 'PASSWORD':
        return {...state, password: false};
      default:
        return state;
    }
  };
  const [hideInput, setHideInput] = useReducer(hiddenReducer, {
    resetToken: true,
    password: true,
  });

  const invalidReducer = (
    state: InvalidCheckerState,
    action: InvalidCheckingType,
  ) => {
    switch (action.type) {
      case 'EMAIL':
        if (
          !(
            inputs.email &&
            inputs.email.includes('.') &&
            inputs.email.includes('@')
          )
        )
          return {...state, email: true};
        return {...state, email: false};
      case 'RESET_TOKEN':
        if (!inputs.resetToken) return {...state, restToken: true};
        return {...state, restToken: false};
      case 'PASSWORD':
        if (inputs.password === '' || inputs.password.length < 8)
          return {...state, password: true};
        return {...state, password: false};
      case 'PASSWORD_CONFIRM':
        if (inputs.password !== inputs.passwordConfirm)
          return {...state, passwordConfirm: true};
        return {...state, passwordConfirm: false};
      default:
        return state;
    }
  };
  const initialInvalidState: InvalidCheckerState = {
    email: false,
    password: false,
    resetToken: false,
    passwordConfirm: false,
  };
  const [invalidChecker, checkInvalidInput] = useReducer(
    invalidReducer,
    initialInvalidState,
  );

  const handlePressButton = async () => {
    if (hideInput.resetToken) {
      if (
        inputs.email &&
        inputs.email.includes('.') &&
        inputs.email.includes('@')
      ) {
        console.log('valid email');
        setLoading(true);
        try {
          // const response = await forgotPassword(inputs.email);
          // await setTimeout(() => {}, 1000)
          console.log('Send token success!');
          setHideInput({type: 'RESET_TOKEN'});
          // console.log(response);
        } catch (error) {
          console.log(error);
          Alert.alert('Wrong email', 'Check your email again!');
        }
        setLoading(false);
      }
    } else {
      // checkInvalidInput({type: 'EMAIL'});
      // checkInvalidInput({type: 'PASSWORD'});
      // checkInvalidInput({type: 'PASSWORD_CONFIRM'});
      setHideInput({type: 'PASSWORD'});
      if (
        inputs.password &&
        inputs.password.length > 8 &&
        inputs.passwordConfirm === inputs.password
      ) {
        setLoading(true);
        try {
          // const response = await resetPassword(
          //   inputs.resetToken,
          //   inputs.password,
          //   inputs.passwordConfirm,
          // );
          // console.log(response);
          console.log('Password changed successfully!');
          navigation.goBack();
        } catch (error) {
          console.log(error);
          Alert.alert('Something went wrong!');
        }
        setLoading(false);
      }
    }
  };
  if (loading) return <LoadingOverlay />;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>RESET PASSWORD</Text>
        </View>
        <View style={styles.formContainer}>
          {!hideInput.password ? (
            <>
              <Input
                label="Password"
                labelStyle={styles.label}
                placeholder="Type password to reset"
                errorMessage={
                  invalidChecker.password &&
                  'Password must have more than 8 characters.'
                }
                inputContainerStyle={styles.input}
                containerStyle={styles.inputContainer}
                leftIcon={
                  <Icon name="key" color={Colors.dark} size={Sizes.icon} />
                }
                inputProps={{
                  onChangeText: (text: String) =>
                    setInputs({...inputs, password: text}),
                  onEndEditing: () => checkInvalidInput({type: 'PASSWORD'}),
                }}
              />
              <Input
                label="Password Confirm"
                labelStyle={styles.label}
                placeholder="Type password again to confirm"
                errorMessage={
                  invalidChecker.passwordConfirm &&
                  'Password confirm and password are not the same!'
                }
                inputContainerStyle={styles.input}
                containerStyle={styles.inputContainer}
                leftIcon={
                  <Icon name="key" color={Colors.dark} size={Sizes.icon} />
                }
                inputProps={{
                  onChangeText: (text: String) =>
                    setInputs({...inputs, passwordConfirm: text}),
                  onEndEditing: () =>
                    checkInvalidInput({type: 'PASSWORD_CONFIRM'}),
                }}
              />
            </>
          ) : (
            <>
              <Input
                label="Email"
                labelStyle={styles.label}
                placeholder="Type your email"
                errorMessage={invalidChecker.email && 'Invalid email!'}
                inputContainerStyle={styles.input}
                containerStyle={styles.inputContainer}
                leftIcon={
                  <Icon name="email" color={Colors.dark} size={Sizes.icon} />
                }
                inputProps={{
                  defaultValue: user.email,
                  onChangeText: (text: string) =>
                    setInputs({...inputs, email: text}),
                  onEndEditing: () => checkInvalidInput({type: 'EMAIL'}),
                }}
              />

              {!hideInput.resetToken && (
                <Input
                  label="Reset code from your email"
                  labelStyle={styles.label}
                  errorMessage={invalidChecker.resetToken && 'Empty reset code'}
                  inputContainerStyle={styles.input}
                  containerStyle={styles.inputContainer}
                  inputProps={{
                    onChangeText: (text: String) =>
                      setInputs({...inputs, resetToken: text}),
                    onEndEditing: () =>
                      checkInvalidInput({type: 'RESET_TOKEN'}),
                  }}
                />
              )}
            </>
          )}
        </View>
        <FlatButton
          label={hideInput.resetToken ? 'Summit' : 'reset'}
          containerStyle={styles.button}
          onPress={handlePressButton}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingContainer: {
    flex: 0.3,
    backgroundColor: Colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 30,
    color: Colors.white,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 0.4,
    alignItems: 'center',
    marginTop: 32,
  },
  label: {
    color: Colors.dark,
    fontSize: 16,
  },
  inputContainer: {},
  input: {
    borderRadius: Sizes.globalBorderRadius,
    backgroundColor: Colors.theme100,
    borderWidth: 2,
    borderColor: Colors.dark,
  },
  button: {
    alignSelf: 'center',
  },
});
