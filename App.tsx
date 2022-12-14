import { Background } from './src/components/Background';
import { StatusBar } from 'react-native'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core'

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

// import './src/services/notificationConfigs'
// import { getPushNotificationToken } from './src/services/getPushNotificationToken'
// import { useEffect, useRef } from 'react';



export default function App() {

  // const getNotificationListenet = useRef<Subscription>()
  // const responseNotificationListeners = useRef<Subscription>()

  // useEffect(() => {
  //   getPushNotificationToken()
  // })

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
