import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';  
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";
import { Asset } from 'expo-asset';
import { Navigation } from './screens/Navigation';

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
  if (!fontsLoaded) {
    return (
      <AppLoading/>
    )
  }
  const loadAssets = async () => await Promise.all([...loadImages()]);
  loadAssets();

  return (
    <Container>
      <Navigation />
    </Container>
  );
};
