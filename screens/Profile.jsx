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
  padding: 5px 20px 0 20px;
  background-color: #1D2228; 
  height: 100%;
`

function Profile({session}) {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const routeName = route.name;

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  useEffect(() => {
      if (session) getProfile();
  }, [session]);

  async function getProfile() {
      try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      const { data, error, status } = await supabase
          .from('profiles')
          .select(`age, gender, weight, height, first_name, last_name`)
          .eq('id', session?.user.id)
          .single();
      if (error && status !== 406) {
          throw error;
      }
      if (data) {
          setFname(data.first_name)
          setLname(data.last_name)
          setGender(data.gender);
          setAge(data.age);
          setWeight(data.weight);
          setHeight(data.height);
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
      <Header/>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <PhotoProfile session={session} name={fname} lname={lname}/>
          <MiniDivInfo height={height} weight={weight}  age={age} gender={gender}/>
          <LastActiv/>
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </ScrollView>
      </Main>
      <Nav routeName={routeName}/>
    </View>
  )
}

export default Profile