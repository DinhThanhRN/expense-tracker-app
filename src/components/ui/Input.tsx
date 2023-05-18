import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';

interface Props {
  label: String;
  placeholder?: String;
  errorMessage?: String;
  secure?: Boolean;
  inputProps?: any;
}

const Input = ({
  label,
  placeholder,
  errorMessage,
  secure,
  inputProps,
}: Props): JSX.Element => {
  const [hidden, setHidden] = useState(secure);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={secure ? [styles.input, {width: '90%'}] : styles.input}
          {...inputProps}
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
    alignContent: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 8,
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
  error: {
    color: 'red',
    fontSize: 16,
  },
});
