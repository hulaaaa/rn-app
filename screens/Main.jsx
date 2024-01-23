import { StyleSheet, Text, View,Image, Alert,ScrollView, RefreshControl } from 'react-native';
import { Button, Input } from 'react-native-elements'

import styled from 'styled-components';
import WelcomeComponent from '../components/MainComponents/WelcomeComponent';
import StatShortComponent from '../components/MainComponents/StatShortComponent';
import TrainingStat from '../components/MainComponents/TrainingStat';
import MuslceTraining from '../components/MainComponents/MuslceTraining';
import {useRoute} from "@react-navigation/native"
import Nav from '../components/MainComponents/Nav';
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react';


const Main = styled.View`
  padding: 5px 15px 0 15px;
  backgroundColor: #1D2228;
  height: auto;
`

function MainScreen({session}) {
    const route = useRoute();
    const routeName = route.name;
    const [loading, setLoading] = useState(true);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [kcal, setKcal] = useState(0);
    const [favex, setFavex] = useState(0);
    const [allTrain, setAllTrain] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    
    async function getFavoriteExerciseIds() {
        try {
          if (!session || !session.user) {
            console.log("You need to be logged in to get favorites.");
            return [];
          }
          const { data, error } = await supabase
            .from('services_favorites')
            .select('exercise_id')
            .eq('user_id', session.user.id);
          if (error) {
            console.log("Error getting favorite exercise ids.");
            console.log(error);
            return [];
          }
          return data.map(item => item.exercise_id);
        } catch (error) {
          console.log(error);
          return [];
        }
    }
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
                    .select(`kcal_count, train_count`)
                    .eq('user_id', userData.id) // assuming there is a field 'id' in the users_profile table that corresponds to the user's id
                    .single();
    
                if (profileError && profileStatus !== 406) {
                    throw profileError;
                }
    
                if (profileData) {
                    setKcal(profileData.kcal_count);
                    setAllTrain(profileData.train_count);
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
    const fetchData = async () => {
        try {
            if (session) {
                await getProfile();
                const favoriteIds = await getFavoriteExerciseIds();
                setFavex(favoriteIds.length);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [session]);
    const onRefresh = () => {
        setRefreshing(true);
        fetchData()
        setTimeout(() => {
          setRefreshing(false);
        }, 600); 
    };

    return (
        <View>
            <Main>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                >
                    <WelcomeComponent 
                        session={session}
                        fname={fname}
                        lname={lname}
                    />
                    <StatShortComponent
                        kcal={kcal}
                        favex={favex}
                        allTrain={allTrain}
                    />
                    <TrainingStat/>
                    <MuslceTraining/>
                </ScrollView>
            </Main>
            <Nav routeName={routeName}/> 
        </View>
    )
}

export default MainScreen