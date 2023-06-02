import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermision() {
  const authStatus = await messaging().requestPermission();
  const enable =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enable) {
    console.log('Authorization status: ', authStatus);
  }
}

const getFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');

  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken();
      if (fcmtoken) await AsyncStorage.setItem('fcmtoken', fcmtoken);
    } catch (error) {
      console.log(error);
    }
  }
  return fcmtoken;
};

const NotificationListener = () => {
  //   const {user} = useSelector((state: RootState) => state.user);

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from the background state',
      remoteMessage.data,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state: ',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Notification from foreground state ...', remoteMessage);
  });
  //   return <></>;
};

export {requestUserPermision, getFCMToken, NotificationListener};
