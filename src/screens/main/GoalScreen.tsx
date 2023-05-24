import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';

const GoalScreen = (): JSX.Element => {
  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Goal',
      tabBarIcon: ({focused}) => (
        <Icon
          name="target"
          color={focused ? Colors.theme : Colors.white}
          size={Sizes.icon}
        />
      ),
    });
  }, []);
  const inputRef = useRef<TextInput>(null);

  const handleButtonPress = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <TextInput ref={inputRef} />
      <Button title="Focus TextInput" onPress={handleButtonPress} />
    </>
  );
};
//   return (
//     <View>
//       <Text>Goal Screen</Text>
//     </View>
//   );
// };

export default GoalScreen;

const styles = StyleSheet.create({
  container: {},
});
