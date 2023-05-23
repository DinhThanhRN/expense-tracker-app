import React, {ReactNode, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';

interface Props {
  label?: String;
  labelStyle?: TextStyle;
  placeholder?: String;
  errorMessage?: String;
  secure?: Boolean;
  inputProps?: any;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  rightIcon?: ReactNode;
  onPressRightIcon?: () => void;
  leftIcon?: ReactNode;
  onPressLeftIcon?: () => void;
}

const Input = ({
  label,
  labelStyle,
  placeholder,
  errorMessage,
  secure,
  inputProps,
  containerStyle,
  inputContainerStyle,
  rightIcon,
  onPressRightIcon = () => {},
  leftIcon,
  onPressLeftIcon = () => {},
}: Props): JSX.Element => {
  const [hidden, setHidden] = useState(secure);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {leftIcon && (
          <Pressable
            onPress={onPressLeftIcon}
            style={({pressed}) => [styles.icon, pressed && {opacity: 0.5}]}>
            {leftIcon}
          </Pressable>
        )}
        <TextInput
          ref={inputRef}
          {...inputProps}
          style={[
            styles.input,
            inputProps?.style,
            (secure || rightIcon || leftIcon) && {width: '90%'},
            leftIcon && rightIcon && {width: '80%'},
          ]}
          placeholder={placeholder}
          secureTextEntry={hidden}
        />
        {secure && (
          <Icon
            name={hidden ? 'eye-off' : 'eye'}
            size={28}
            color={Colors.dark}
            onPress={() => setHidden(!hidden)}
          />
        )}
        {rightIcon && (
          <Pressable
            onPress={() => {
              onPressRightIcon();
              inputRef.current?.focus();
            }}
            style={({pressed}) => [styles.icon, pressed && {opacity: 0.5}]}>
            {rightIcon}
          </Pressable>
        )}
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 110,
    marginBottom: Sizes.globalPadding,
  },
  label: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: Sizes.globalPadding,
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    height: 50,
    color: Colors.dark,
  },
  icon: {
    marginHorizontal: Sizes.globalPadding,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
