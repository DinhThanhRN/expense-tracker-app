import {Alert} from 'react-native';

export const createPlainAlert = (title: string, message: string) => {
  Alert.alert(title, message);
};
