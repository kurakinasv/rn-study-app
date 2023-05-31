import { useCallback } from 'react';
import { SafeAreaView } from 'react-native';

import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import styled from 'styled-components';

import { routes } from '@config/routes';

SplashScreen.preventAutoHideAsync();

// enables notifications for the app
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  padding: 30px;
`;

const App = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    Montserrat: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),

    'Rubik-Light': require('../assets/fonts/Rubik/Rubik-Light.otf'),
    Rubik: require('../assets/fonts/Rubik/Rubik-Regular.otf'),
    'Rubik-SemiBold': require('../assets/fonts/Rubik/Rubik-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaContainer onLayout={onLayoutRootView}>
      <Redirect href={routes.auth} />
    </SafeAreaContainer>
  );
};

export default App;
