import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabProps} from '../../types/NavigationProps';
import {Colors} from '../../configs/colors';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const InsightsScreen = (): JSX.Element => {
  const navigation = useNavigation<BottomTabProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Insights',
      tabBarIcon: ({focused}) => (
        <Icon
          name="chart-bar"
          color={focused ? Colors.theme : Colors.white}
          size={30}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Insights Screen</Text>
    </View>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
