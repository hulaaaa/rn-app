import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import styled from 'styled-components/native';  
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Account from './screens/Account';
import { Asset } from 'expo-asset';
import { SplashScreen } from 'expo-splash-screen'; // Змінено імпорт
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const Container = styled.View`
  flex: 1;
  background-color: #1D2228;
  margin: 0;
  padding: 0;
  padding-top: 45px;
`;

const Stack = createNativeStackNavigator();

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Montserrat300': require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat400': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat500': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat700': require('./assets/fonts/Montserrat-Bold.ttf'),
    });
    return true;
  } catch (error) {
    console.warn('Error loading fonts:', error);
    return false;
  }
};

const loadAssets = async () => {
  const images = [
    require('./assets/avatarka.png'),
    require('./assets/image/abs.jpg'),
    require('./assets/image/back.jpg'),
    require('./assets/image/biceps.jpg'),
  ];

  const imageAssets = images.map(image => Asset.fromModule(image).downloadAsync());
  await Promise.all([...imageAssets]);
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadApp = async () => {
    const fontLoadResult = await loadFonts();

    if (fontLoadResult) {
      setFontsLoaded(true);
      await SplashScreen.preventAutoHideAsync();
      await loadAssets();
      SplashScreen.hideAsync();
    }
  };


  const [session, setSession] = useState(null);

  useEffect(() => {
    loadApp();
    supabase.auth.getSession().then(({ data }) => {
      if (data && data.session) {
        setSession(data.session);
      }
    });

    const authStateChangeHandler = (_event, newSession) => {
      setSession(newSession);
    };

    supabase.auth.onAuthStateChange(authStateChangeHandler);

    return () => {
      supabase.auth.removeAuthListener(authStateChangeHandler);
    };
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Container>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session ? (
            <Stack.Screen name="Account" component={Account} />
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Container>
  );
}
