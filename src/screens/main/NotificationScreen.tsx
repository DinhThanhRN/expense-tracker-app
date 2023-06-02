import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, View, RefreshControl} from 'react-native';

import {Sizes} from '../../configs/sizes';
import NotificationBox from '../../components/notification/NotificationBox';
import {NotificationHandler} from '../../utils/functions/api/notification';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';
import {Notification} from '../../interfaces/Notification';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {useNavigationState} from '@react-navigation/native';

const NotificationScreen = (): JSX.Element => {
  const index = useNavigationState(state => state.index);
  const {user} = useSelector((state: RootState) => state.user);

  const [notifications, setNotifications] = useState<Notification[]>();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await new NotificationHandler(user.id, user.token)
          .getAllNotification()
          .then(response => {
            setNotifications(response.reverse());
          });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, [refresh, index]);

  const renderItem = ({item}: any) => {
    return <NotificationBox data={item} />;
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  }, []);

  if (loading || refresh) return <LoadingOverlay />;
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.globalPadding,
  },
});
