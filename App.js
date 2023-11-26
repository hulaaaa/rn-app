import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';  
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { Asset } from 'expo-asset';
import { Navigation } from './screens/Navigation';
import { useEffect, useState } from 'react';

const Container = styled.View`
  flex: 1;
  backgroundColor: #1D2228;
  margin: 0;
  padding: 0;
  padding-top: 45px;
`

const loadFonts = () => {
  return useFonts({
    'Montserrat300': require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat400': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat500': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat700': require('./assets/fonts/Montserrat-Bold.ttf'),
  });
};

const loadImages = () => {
  const images = [
    require('./assets/avatarka.png'),
    require('./assets/image/abs.jpg'),
    require('./assets/image/back.jpg'),
    require('./assets/image/biceps.jpg'),
  ];
  return images.map(image => Asset.fromModule(image).downloadAsync());
};

export default App = () => {
  let [fontsLoaded] = loadFonts();
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Promise.all([...loadImages()]);
        setSplashReady(true);
        SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    init();
  }, []);

  if (!fontsLoaded || !isSplashReady) return null;

  return (
    <Container>
      <Navigation />
    </Container>
  );
};
