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
  padding: 5px 20px 0 20px;
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


function Allexer() {

    const route = useRoute();
    const routeName = route.name;
    return (
        <View>
            <Main>
                <Header text="Favorite exercise"/>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <BoxFex>

                        <FavExercise image="biceps"  title="One Hand Dumbbell" reps="Set 5 · 10 Reps"/>
                        <FavExercise image="back"  title="Overhead Press" reps="Set 3 · 15 Reps"/>
                        <FavExercise image="abs"  title="Bend Over Row" reps="Set 4 · 12 Reps"/>

                    </BoxFex>
                </ScrollView>
            </Main>
            <Nav routeName={routeName}/>
        </View>
    )
}

export default Allexer