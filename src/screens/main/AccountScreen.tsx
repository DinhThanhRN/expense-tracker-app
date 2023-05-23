import {useNavigation} from '@react-navigation/native';
import React, {useRef, useLayoutEffect, useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import FlatButton from '../../components/ui/FlatButton';
import Input from '../../components/ui/Input';
import {Sizes} from '../../configs/sizes';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../reducers/store';
import IconButton from '../../components/ui/IconButton';
import {removeUser, setUser, updateUser} from '../../reducers/user';
import {updateAccount} from '../../utils/functions/communicateAPI';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import PressableText from '../../components/ui/PressableText';
import ImageCropPicker from 'react-native-image-crop-picker';
import {uploadImageToCloudinary} from '../../services/upload/uploadImageToCloudinary';

interface AllowedChangingState {
  name: boolean;
  email: boolean;
  avatar: boolean;
}
type ChangingActionType = 'NAME' | 'EMAIL' | 'AVATAR';
type ChangingAction = {
  type: ChangingActionType;
};

const shortenAvatarName = (name?: String) =>
  name ? name.split('/')[name.split('/').length - 1] + '' : '';

const AccountScreen = (): JSX.Element => {
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Account',
      tabBarIcon: ({focused}) => (
        <Icon
          name="account"
          color={focused ? Colors.theme : Colors.white}
          size={30}
        />
      ),
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [base64Image, setBase64Image] = useState<any>();
  // const shortenAvatarName =

  const [inputs, setInputs] = useState<any>({
    saveAs: shortenAvatarName(user.avatar).slice(
      0,
      shortenAvatarName(user.avatar).indexOf('.'),
    ),
  });

  const reducer = (state: AllowedChangingState, action: ChangingAction) => {
    switch (action.type) {
      case 'NAME':
        return {...state, name: true};
      case 'AVATAR':
        return {...state, avatar: true};
      case 'EMAIL':
        return {...state, email: true};
      default:
        return state;
    }
  };
  const initialChangingState: AllowedChangingState = {
    name: false,
    email: false,
    avatar: false,
  };

  const [allowedInfor, changeAllowedInfor] = useReducer(
    reducer,
    initialChangingState,
  );

  const handleChangeAvatar = async () => {
    try {
      const image: any = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });

      setBase64Image(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(shortenAvatarName.slice(0, shortenAvatarName.indexOf('.')));
  const handleSummiting = async () => {
    if (
      base64Image ||
      inputs.avatar ||
      inputs.name ||
      inputs.email ||
      inputs.saveAs !==
        shortenAvatarName(user.avatar).slice(
          0,
          shortenAvatarName(user.avatar).indexOf('.'),
        )
    ) {
      console.log(inputs);
      setLoading(true);
      try {
        const image = await uploadImageToCloudinary(
          base64Image ?? user.avatar,
          inputs.saveAs,
        );
        setInputs({...inputs, avatar: image.secure_url.toString()});

        const response = await updateAccount(user.token, inputs);
        dispatch(updateUser(response));
        console.log(response);
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Fail to change personal account!',
          'Please check you inputs',
        );
      }
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch(removeUser());
  };

  if (loading) return <LoadingOverlay />;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setFocused(false);
      }}>
      <View style={styles.container}>
        <IconButton
          name="logout"
          color={'red'}
          style={{top: 0, right: 0, position: 'absolute', zIndex: 1}}
          size={40}
          onPress={logout}
        />
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image
              source={{uri: base64Image ?? user.avatar}}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatar}></View>
          )}

          <View style={styles.avatarName}>
            <TextInput
              ref={inputRef}
              editable={allowedInfor.avatar}
              defaultValue={shortenAvatarName(user.avatar).slice(
                0,
                shortenAvatarName(user.avatar).indexOf('.'),
              )}
              onChangeText={text =>
                setInputs({
                  ...inputs,
                  saveAs: text.includes('.')
                    ? text.slice(0, text.indexOf('.'))
                    : text,
                })
              }
              style={[
                {
                  height: '85%',
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecorationLine: 'underline',
                },
                focused && {
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.dark,
                },
              ]}></TextInput>
            <IconButton
              name="pencil"
              color={Colors.dark}
              style={styles.avatarNameEditor}
              size={24}
              onPress={() => {
                changeAllowedInfor({type: 'AVATAR'});
                inputRef.current?.focus();
                setFocused(true);
              }}
            />
          </View>
          <PressableText
            textStyle={{
              fontSize: 16,
              color: Colors.dark,
            }}
            style={styles.uploadButton}
            onPress={handleChangeAvatar}>
            Upload avatar
          </PressableText>
        </View>
        <View style={styles.formContainer}>
          <Input
            label="Name"
            labelStyle={styles.inputLable}
            placeholder="Type your name"
            leftIcon={<Icon name="account" size={30} color={Colors.dark} />}
            rightIcon={<Icon name="pencil" size={24} color={Colors.dark} />}
            onPressRightIcon={() => {
              changeAllowedInfor({type: 'NAME'});
            }}
            containerStyle={{flex: 0.33}}
            inputContainerStyle={styles.input}
            inputProps={{
              editable: allowedInfor.name,
              // defaultValue: user.name,
              style: {
                fontWeight: 'bold',
              },
              onChangeText: (text: string) =>
                setInputs({...inputs, name: text}),
              value: inputs.name ?? user.name,
            }}
          />
          <Input
            label="Email"
            labelStyle={styles.inputLable}
            placeholder="Type your email"
            leftIcon={<Icon name="email" size={30} color={Colors.dark} />}
            rightIcon={<Icon name="pencil" size={24} color={Colors.dark} />}
            onPressRightIcon={() => {
              changeAllowedInfor({type: 'EMAIL'});
            }}
            containerStyle={{flex: 0.33}}
            inputContainerStyle={styles.input}
            inputProps={{
              editable: allowedInfor.email,
              defaultValue: user.email,
              style: {
                fontWeight: 'bold',
              },
              onChangeText: (text: string) =>
                setInputs({...inputs, email: text}),
              value: inputs.email,
            }}
          />
          <Input
            label="Password"
            labelStyle={styles.inputLable}
            placeholder="Type your password"
            leftIcon={<Icon name="key" size={30} color={Colors.dark} />}
            rightIcon={<Icon name="pencil" size={24} color={Colors.dark} />}
            containerStyle={{flex: 0.33}}
            inputContainerStyle={styles.input}
            inputProps={{
              editable: false,
              value: 'password',
              secureTextEntry: true,
              style: {
                fontWeight: 'bold',
              },
            }}
          />
        </View>
        <FlatButton
          label="summit"
          containerStyle={styles.button}
          onPress={handleSummiting}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.globalPadding,
    backgroundColor: Colors.white,
  },
  avatarContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.dark,
    backgroundColor: Colors.dark,
  },
  uploadButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark,
    paddingHorizontal: 4,
  },
  avatarName: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
  },
  avatarNameEditor: {
    width: 30,
    height: 30,
    marginLeft: 6,
    zIndex: 1,
    borderRadius: 15,
    // position: 'absolute',
  },
  formContainer: {
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLable: {
    color: Colors.dark,
    fontSize: 18,
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: Colors.theme100,
  },
  button: {
    flex: 0.1,
    backgroundColor: Colors.theme,
    alignSelf: 'center',
  },
});
