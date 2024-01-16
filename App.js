import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Profile from './screens/Profile';
import Register from './screens/Register';
import { Asset } from 'expo-asset';
import { SplashScreen } from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import MainScreen from './screens/Main';
import styled from 'styled-components';
import Reg_info from './screens/Reg_info';
import { Favorite } from './screens/Favorite';
import Allexer from './screens/Allexer';
import SelTrein from './screens/SelTrein';
import PreStart from './components/AllexerComponents/PreStart';
import TrainingNow from './screens/TrainingNow';

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
      'Montserrat700': require('./assets/fonts/Montserrat-Bold.ttf')
    });
    return true;
  } catch (error) {
    console.warn('Error loading fonts:', error);
    return false;
  }
};


const loadAssets = async () => {
  try {
    const imageAssets = [
      require('/assets/avatarka.png'),
      require('./assets/image/abs.jpg'),
      require('./assets/image/back.jpg'),
      require('./assets/image/biceps.jpg')
    ];
    const assetPromises = imageAssets.map((image) => Asset.fromModule(image).downloadAsync());
    await Promise.all(assetPromises);
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

  return (
    <Container>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, }}>
          {session && session.user ? (
            <>
              <Stack.Screen
                name="Main"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <MainScreen key={session.user.id} session={session}/>}
              </Stack.Screen>

              <Stack.Screen
                name="Allexer"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <Allexer key={session.user.id} session={session}/>}
              </Stack.Screen>

              <Stack.Screen
                name="SelTrein"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <SelTrein key={session.user.id} session={session}/>}
              </Stack.Screen>

              <Stack.Screen
                name="PreStart"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <PreStart key={session.user.id} session={session}/>}
              </Stack.Screen>
              
              <Stack.Screen
                name="Favorite"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <Favorite key={session.user.id} session={session}/>}
              </Stack.Screen>

              <Stack.Screen
                name="Profile"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <Profile key={session.user.id} session={session}/>}
              </Stack.Screen>

              <Stack.Screen
                name="TrainingNow"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <TrainingNow key={session.user.id} session={session}/>}
              </Stack.Screen>
              
              <Stack.Screen
                name="Reginfo"
                options={{
                  headerShown: false,
                  initialParams: { session },
                }}
              >
                {() => <Reg_info key={session.user.id} session={session}/>}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Container>
  );
}
