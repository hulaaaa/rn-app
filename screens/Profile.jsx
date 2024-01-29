import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import Header from '../components/ProfileComponents/Header';
import PhotoProfile from '../components/ProfileComponents/PhotoProfile';
import MiniDivInfo from '../components/ProfileComponents/MiniDivInfo';
import Nav from '../components/MainComponents/Nav';
import {useRoute} from "@react-navigation/native"
import LastActiv from '../components/ProfileComponents/LastActiv';
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button, Input } from 'react-native-elements';

const Main = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  background-color: #1D2228; 
  height: 100%;
`
const ButtonSignOut = styled.TouchableOpacity`
  padding: 12px 0px;
  margin-top: 22px;
  display: flex;
  align-items: center;
  background-color: #E0FE10;
  border-radius: 14px;
  weight: 100%;
`

function Profile({session}) {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const routeName = route.name;

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState(null);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
      if (session) {
        getProfile();

      }
  }, [session]);

  async function getProfile() {
    try {
        setLoading(true);
        if (!session?.user) throw new Error('No user on the session!');

        // First, fetch data from users_user table
        const { data: userData, error: userError, status: userStatus } = await supabase
            .from('users_user')
            .select(`first_name, last_name, id`)
            .eq('id', session?.user.id)
            .single();

        if (userError && userStatus !== 406) {
            throw userError;
        }

        if (userData) {
            setFname(userData.first_name);
            setLname(userData.last_name);

            // Second, fetch data from users_profile table using the user id
            const { data: profileData, error: profileError, status: profileStatus } = await supabase
                .from('users_profile')
                .select(`weight, height, gender`)
                .eq('user_id', userData.id) // assuming there is a field 'id' in the users_profile table that corresponds to the user's id
                .single();

            if (profileError && profileStatus !== 406) {
                throw profileError;
            }

            if (profileData) {
                setWeight(profileData.weight);
                setHeight(profileData.height);
                setGender(profileData.gender);
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    } finally {
        setLoading(false);
    }
  }

  

  return (
    <View>
      <Main>
      <Header text="Profile"/>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <PhotoProfile session={session} name={fname} lname={lname}/>
          <MiniDivInfo height={height} weight={weight}  gender={gender}/>
          <ButtonSignOut onPress={() => supabase.auth.signOut()}>
            <Text style={{
                color: "black",
                fontFamily: "Montserrat700",
                fontSize: 17
            }}>
              Sign Out
            </Text>
          </ButtonSignOut>
          <LastActiv id={session?.user.id}/>
        </ScrollView>
      </Main>
      <Nav routeName={routeName}/>
    </View>
  )
}

export default Profile