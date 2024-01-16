import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useRoute } from "@react-navigation/native";
import { supabase } from '../lib/supabase';
import { useNavigation } from "@react-navigation/native";
import Nav from '../components/MainComponents/Nav';
import DropdownComponent from '../components/AllexerComponents/DropdownComponent';
import WorkoutDiv from '../components/AllexerComponents/WorkoutDiv';

const Main = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px 20px 0 20px;
  background-color: #1D2228; 
  height: 100%;
`;

const HeaderText = styled.Text`
    color: #FEFFFF;
    font-family: Montserrat700;
    font-size: 50px;
`;

const TextWheader = styled.Text`
    color: #FEFFFF;
    font-family: Montserrat700;
    font-size: 50px;
    font-style: italic;
`;

const SelectLevel = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 35px;
`;

const HrLine = styled.View`
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.20);
    margin: 20px 0px;
`;

const FitnessLevelText = styled.Text`
    color: #FFF;
    font-family: Montserrat400;
    font-size: 15px;
`;

export const Favorite = ({ session }) => {
    const route = useRoute();
    const routeName = route.name;
    const navigation = useNavigation();
    const [allTrain, setAllTrain] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState(null);

    useEffect(() => {
        if (session) {
            getTableData();
        }
    }, [session]);


    const handleLevelSelect = (selectedLevel) => {
        setSelectedLevel(selectedLevel);
    };

    async function getTableData() {
        try {
            const tableName = 'services_exercises';
            const { data, error } = await supabase
                .from(tableName)
                .select('*');
            if (error) {
                throw error;
            }
            setAllTrain(data);
            setLoading(false);
        } catch (error) {
            console.error('Помилка отримання даних:', error.message);
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Main>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TextWheader>W</TextWheader>
                        <HeaderText>ORKOUT</HeaderText>
                    </View>
                    <SelectLevel>
                        <DropdownComponent onSelect={handleLevelSelect} />
                        <FitnessLevelText>FITNESS LEVEL</FitnessLevelText>
                    </SelectLevel>
                    <HrLine />
                    {loading ? (
                        <ActivityIndicator size="large" color="#FFF" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                    ) : selectedLevel ? (
                        <View style={{ gap: '10px' }}>
                            <WorkoutDiv
                                onPress={() => navigation.navigate('SelTrein', { selectedCategory: "Yoga", selectedLevel: selectedLevel, allTrain: allTrain.filter(item => item.exercise_category === "Yoga" && item.exercise_level === selectedLevel) })}
                                text="Yoga"
                                img="https://waotqiccymmikmwadsdl.supabase.co/storage/v1/object/public/image_ex/yoga.png"
                                numWork={0}
                            />
                            <WorkoutDiv 
                                onPress={() => navigation.navigate('SelTrein', { selectedCategory: "Gym", selectedLevel: selectedLevel, allTrain: allTrain.filter(item => item.exercise_category === "Gym" && item.exercise_level === selectedLevel) })}
                                text="Gym"
                                img="https://waotqiccymmikmwadsdl.supabase.co/storage/v1/object/public/image_ex/biceps.jpg"
                                numWork={0}
                            />
                            <WorkoutDiv
                                onPress={() => navigation.navigate('SelTrein', { selectedCategory: "Cardio", selectedLevel: selectedLevel, allTrain: allTrain.filter(item => item.exercise_category === "Cardio" && item.exercise_level === selectedLevel) })}
                                text="Cardio"
                                img="https://waotqiccymmikmwadsdl.supabase.co/storage/v1/object/public/image_ex/Figma%20Image%201824x1216.png"
                                numWork={0}
                            />
                            <WorkoutDiv
                                onPress={() => navigation.navigate('SelTrein', { selectedCategory: "Stretching", selectedLevel: selectedLevel, allTrain: allTrain.filter(item => item.exercise_category === "Stretching" && item.exercise_level === selectedLevel) })}
                                text="Stretching"
                                img="https://waotqiccymmikmwadsdl.supabase.co/storage/v1/object/public/image_ex/iGains%20screenshot.png"
                                numWork={0}
                            />
                        </View>
                    ) : (
                        <TextWheader style={{ textAlign: 'center', marginTop: 20, fontSize: 20, color: '#FFF' }}>Select a level to view workouts</TextWheader>
                    )}
                </ScrollView>
            </Main>
            <Nav routeName={routeName} />
        </View>
    );
};