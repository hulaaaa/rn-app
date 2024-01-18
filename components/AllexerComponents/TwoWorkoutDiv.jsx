import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {useRoute} from "@react-navigation/native"
import { supabase } from '../../lib/supabase';
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Rect, Path, Defs } from "react-native-svg"

const ArrowGo = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
        <Path
        stroke="#fff"
        d="M15.34 6.143c-.194.928-.737 1.859-1.484 2.747-.743.885-1.665 1.7-2.572 2.396A26.94 26.94 0 0 1 8.058 13.4L8 13.432l-.058-.032a26.94 26.94 0 0 1-3.226-2.114C3.81 10.59 2.887 9.775 2.144 8.89 1.397 8.002.854 7.071.66 6.143c-.404-1.93-.001-3.33.736-4.238C2.14.987 3.274.507 4.444.507h.03A3.72 3.72 0 0 1 6.252.84c.549.254 1.01.636 1.34 1.102L8 2.52l.408-.577c.33-.466.791-.848 1.34-1.102a3.72 3.72 0 0 1 1.778-.333h.03c1.17 0 2.304.48 3.048 1.398.738.909 1.14 2.307.736 4.238Z"
        />
    </Svg>
)
const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 7px;
    width: 100%;
    height: auto;
    border-radius: 17px;
    background: #2A2E37;
`
const TrainImg = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 12px;
`

function TwoWorkoutDiv({onPress, workoutName}) {
  return (
    <Container onPress={onPress}>
        <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", gap: "15px"}}>
            <TrainImg source={{uri: workoutName.exercise_image}}/>
            <View style={{display: "flex", flexDirection: "column", justifyContent:"space-between"}}>
                <Text style={{color: "#E0FE10",fontFamily: "Montserrat700",fontSize: 22,flexWrap: "wrap",maxWidth: 220 }}>
                    {workoutName.exercise_title}
                </Text>
                <Text style={{color: "rgba(255, 255, 255, 0.80)",fontFamily: "Montserrat300",fontSize: 12,}}>
                    {workoutName.exercise_kcal} KCAL · {workoutName.exercise_duration} MIN
                </Text>
            </View>
        </View>
    </Container>
  )
}

export default TwoWorkoutDiv