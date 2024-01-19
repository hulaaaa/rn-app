import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView ,ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import Svg, { Path } from "react-native-svg"
import { supabase } from '../../lib/supabase.js';
import { useNavigation } from "@react-navigation/native";


const Container = styled.View`
  display: flex;   
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px;
  background: #2A2E37;
  border-radius: 20px;

`
const TrainingImage = styled.Image`
    width: 80px;
    aspect-ratio: 2/2;
    border-radius: 10px;
`
const CenterDotSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <Path
        fill="#E0FE10"
        fillRule="evenodd"
        d="M18.07.719a2.454 2.454 0 0 0-3.47 0L9.378 5.942 4.365.929A2.454 2.454 0 1 0 .895 4.4l5.012 5.013L.719 14.6a2.454 2.454 0 1 0 3.47 3.47l5.188-5.187 5.399 5.398a2.454 2.454 0 1 0 3.47-3.47l-5.398-5.399L18.07 4.19a2.454 2.454 0 0 0 0-3.47Z"
        clipRule="evenodd"
      />
    </Svg>
)

function FavExercise({session,item,onRemove}) {
    const navigation = useNavigation();
    async function removeFromFavorites() {
        try {
          if (!session || !session.user) {
            console.log("You need to be logged in to remove from favorites.");
            return;
          }
          const { data, error } = await supabase
            .from('services_favorites')
            .delete()
            .eq('exercise_id', item.id)
            .eq('user_id', session.user.id);
      
          if (error) {
            console.log("Error removing from favorites. Please try again.");
            console.log(error);
            return;
          }
      
          console.log("Success");
          onRemove()
        } catch (error) {
          console.log(error);
        }
      };
    return (
    <>
        <Container>
            <View style={{display:"flex",flexDirection: "row",alignItems: "center",gap: "20",}}>
            <TrainingImage source={{ uri: item.exercise_image }} />
                <View style={{display:"flex",flexDirection: "column",alignItems: "flex-start",gap: "8px",}}>
                    <Text style={{color: "#E0FE10",fontFamily: "Montserrat700",fontSize: 15}}>
                        {item.exercise_title}
                    </Text>
                    <Text style={{color: "rgba(255, 255, 255, 0.80)",fontFamily: "Montserrat300",fontSize: 13}}>
                    {`${item.exercise_duration} Min · ${item.exercise_kcal} Kcal`}
                    </Text>
                </View>
            </View>
            <TouchableOpacity 
                style={{width: 20,height: 20}}
                onPress={() => {removeFromFavorites()}}
            >
                <CenterDotSvg />
            </TouchableOpacity>   
        </Container>
    </>
  )
}

export default FavExercise