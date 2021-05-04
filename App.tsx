import React, { useEffect } from 'react';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'
import Routes from './src/routes';
import * as Notifications from 'expo-notifications';
import { PlantPlops } from './src/libs/storage';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [fontsLoader] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  async function notificationPermission() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if(status != 'granted'){
      const {granted} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

  useEffect(() => {
    notificationPermission();
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantPlops;
        console.log(data);
      });

      return () => subscription.remove();
  }, [])

  if(!fontsLoader)
    return <AppLoading />

  return(
    <Routes />
  )
}