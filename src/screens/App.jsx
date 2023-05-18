import { useCallback } from 'react';
import { View } from 'react-native';

import { useFonts } from 'expo-font';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),

    'Rubik-Light': require('../assets/fonts/Rubik/Rubik-Light.otf'),
    'Rubik-Regular': require('../assets/fonts/Rubik/Rubik-Regular.otf'),
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
    <View onLayout={onLayoutRootView}>
      <Redirect href="notes" />
    </View>
  );
};

export default App;
