import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Account from './screens/Account';
import Profile from './screens/Profile';
import { Asset } from 'expo-asset';
import { SplashScreen } from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import MainScreen from './screens/Main';
import styled from 'styled-components';

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
    console.log('Loading fonts...');
    // Ваш код завантаження шрифтів
    console.log('Fonts loaded successfully');
    return true;
  } catch (error) {
    console.warn('Error loading fonts:', error);
    return false;
  }
};

const loadAssets = async () => {
  try {
    console.log('Loading assets...');
    // Ваш код завантаження ресурсів
    console.log('Assets loaded successfully');
  } catch (error) {
    console.warn('Error loading assets:', error);
  }
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadApp = async () => {
      console.log('Loading app...');
      const fontLoadResult = await loadFonts();

      if (fontLoadResult) {
        setFontsLoaded(true);
        await SplashScreen.preventAutoHide();
        await loadAssets();
        SplashScreen.hide();
      } else {
        console.error('Font loading failed.');
      }
    };

    loadApp();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
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

  console.log('Rendering the main component...');

  return (
    <Container>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session && session.user ? (
            <>
              <Stack.Screen
                name="Account"
                component={() => <Account session={session} />}
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              />
              {/* Інші екрани для користувача */}
            </>
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
