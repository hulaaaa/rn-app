import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {useRoute} from "@react-navigation/native"
import { supabase } from '../lib/supabase';
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
import TwoWorkoutDiv from '../components/AllexerComponents/TwoWorkoutDiv';

const Main = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  background-color: #1D2228; 
  width: 100%;
  height: 100%;
`
const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`
const TextDiv = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const EmptyDiv = styled.View`
width: 61px;
height: 61px;
`
const WorkoutDiv = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SvgComponent = ({onPress}) => (
  <TouchableOpacity style={{ width: 61, height: 61 }} onPress={onPress}>
    <Svg width={61} height={61} fill="none">
      <Rect width={61} height={61} fill="#2A2E37" rx={30.5} />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="m33 25-4.793 4.793a1 1 0 0 0 0 1.414L33 36"
      />
    </Svg>
  </TouchableOpacity>
);


function SelTrein({ session }) {
  const route = useRoute();

  const { selectedCategory, selectedLevel, allTrain } = route.params || {};
  console.log('selectedCategory:', selectedCategory);
  console.log('selectedLevel:', selectedLevel);
  console.log('selectedLevel:', allTrain);


  const navigation = useNavigation();

  
  

  return (
    <Main>
      <Header>
        <SvgComponent onPress={() => { navigation.goBack() }} />

        <TextDiv>
          <Text style={{
            color: "#FFF",
            fontFamily: "Montserrat700",
            fontSize: 20,
          }}>
            {selectedCategory} 
          </Text>
          <Text style={{
            color: "#C6C6C6",
            fontFamily: "Montserrat300",
            fontSize: 12,
          }}>
            {selectedLevel} - {allTrain.length} WORKOUT
          </Text>
        </TextDiv>
        <EmptyDiv />
      </Header>

      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={{ gap: "10px" }}>
          {
            allTrain.map(item => (
              <TwoWorkoutDiv workoutName={item} key={item.id} onPress={() => { navigation.navigate('PreStart') }} />))
          }

        </View>
      </ScrollView>
    </Main>
  )
}

export default SelTrein;

