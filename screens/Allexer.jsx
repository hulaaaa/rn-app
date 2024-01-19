import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {useRoute} from "@react-navigation/native"
import { supabase } from '../lib/supabase';
import Nav from '../components/MainComponents/Nav';
import Header from '../components/ProfileComponents/Header';
import FavExercise from '../components/FavComponents/FavExercise';



const Main = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  background-color: #1D2228; 
  height: 100%;
`

const BoxFex = styled.View`
  display: flex;   
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
  width: 100vw;
`


function Allexer({session}) {
    const route = useRoute();
    const routeName = route.name;
    const [favoriteExercises, setFavoriteExercises] = useState([]);
    const [key, setKey] = useState(0);

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
    async function getExercisesByFavoriteIds(favoriteIds) {
        try {
          if (!favoriteIds || favoriteIds.length === 0) {
            console.log("No favorite exercise ids provided.");
            return [];
          }
          const { data, error } = await supabase
            .from('services_exercises')
            .select('*')
            .in('id', favoriteIds);
          if (error) {
            console.log("Error getting exercises by favorite ids.");
            console.log(error);
            return [];
          }
          return data;
        } catch (error) {
          console.log(error);
          return [];
        }
    }
    async function fetchData() {
        try {
            const favoriteIds = await getFavoriteExerciseIds();
            const favoriteExercises = await getExercisesByFavoriteIds(favoriteIds);
            setFavoriteExercises(favoriteExercises)
        } catch (error) {
            console.log(error);
        }
    }
    const handleRemove = async () => {
      try {
          await fetchData(); // Оновлюємо дані перед зміною key
          setKey((prevKey) => prevKey + 1);
      } catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
        fetchData();
    }, [key]);
    return (
        <View key={key}>
            <Main>
                <Header text="Favorite exercise"/>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <BoxFex>
                        {
                            favoriteExercises.length>0?
                            favoriteExercises.map((item, index) => (
                                <FavExercise key={index} item={item} session={session}onRemove={handleRemove} />
                            )):(
                            <Text style={{color: "#FFF",fontFamily: "Montserrat700",fontSize: 15}}>
                                No favorite exercises. 
                            </Text>
                            )
                        
                        }

                    </BoxFex>
                </ScrollView>
            </Main>
            <Nav routeName={routeName}/>
        </View>
    )
}

export default Allexer