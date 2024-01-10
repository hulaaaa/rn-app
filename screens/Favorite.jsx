import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {useRoute} from "@react-navigation/native"
import { supabase } from '../lib/supabase';
import Nav from '../components/MainComponents/Nav';



const Main = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px 20px 0 20px;
  background-color: #1D2228; 
  height: 100%;
`
const TrainingImage = styled.Image`
    width: 100%;
    height: 30%;
`

export const Favorite = ({session}) => {
    const route = useRoute();
    const routeName = route.name;
    return (
        <View>
            {/* <TrainingImage source={require('../assets/image/imgBody.png')}/> */}
            <Main>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <Text>Tr</Text>

                </ScrollView>
            </Main>
            <Nav routeName={routeName}/>
        </View>
    )
}
