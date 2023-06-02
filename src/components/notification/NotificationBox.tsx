import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../configs/colors';
import {Sizes} from '../../configs/sizes';
import PressableText from '../ui/PressableText';
import {Notification} from '../../interfaces/Notification';

const formatHour = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  if (date.getDay() !== new Date().getDay()) {
    options.day = '2-digit';
    options.month = 'short';
  }
  if (date.getFullYear() !== new Date().getFullYear()) {
    options.year = 'numeric';
  }

  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

interface Props {
  data: Notification;
}

const NotificationBox = ({data}: Props): JSX.Element => {
  const [marked, setMark] = useState(true);
  const [deleted, setDeleted] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setDeleted(false)}>
      <Pressable
        style={[styles.container, deleted && {backgroundColor: Colors.red}]}
        onLongPress={() => setDeleted(!deleted)}>
        <View style={{flex: 0.8}}>
          <View style={styles.titleContainer}>
            {marked && <View style={styles.mark} />}
            <Text style={[styles.title, deleted && {color: Colors.white}]}>
              {data.title}
            </Text>
          </View>
          <Text style={[styles.body, deleted && {color: Colors.white}]}>
            {data.body}
          </Text>
        </View>

        <View style={styles.inforContainer}>
          <View style={styles.timeContainer}>
            <Icon
              name="clock-outline"
              size={24}
              color={deleted ? Colors.white : Colors.dark}
            />
            <Text style={[styles.time, deleted && {color: Colors.white}]}>
              {formatHour(new Date(data.sentTime))}
            </Text>
          </View>

          <PressableText
            textStyle={[styles.markText, deleted && {color: Colors.dark}]}
            onPress={() => setMark(false)}>
            Mark as read
          </PressableText>
        </View>
      </Pressable>
    </TouchableWithoutFeedback>
  );
};

export default NotificationBox;

const styles = StyleSheet.create({
  container: {
    height: 160,
    padding: 16,
    borderRadius: Sizes.globalBorderRadius,
    elevation: 4,
    marginVertical: Sizes.globalPadding,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  body: {
    fontSize: 18,
  },
  inforContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginLeft: 8,
  },
  markText: {
    color: Colors.theme300,
    fontWeight: 'bold',
  },
  mark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.theme300,
  },
});
