import { StyleSheet, Text, View,Image, ScrollView } from 'react-native';
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
  height: fit-content;
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

    useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
        setLoading(true);
        if (!session?.user) throw new Error('No user on the session!');

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`first_name, last_name, all_kcal, fav_exercise, all_trainings`)
            .eq('id', session?.user.id)
            .single();
        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            setFname(data.first_name)
            setLname(data.last_name)
            setKcal(data.all_kcal)
            setFavex(data.fav_exercise)
            setAllTrain(data.all_trainings)
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
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
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