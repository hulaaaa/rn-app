import { StyleSheet, Text, View,Image, ScrollView } from 'react-native';
import styled from 'styled-components';
import WelcomeComponent from '../components/MainComponents/WelcomeComponent';
import StatShortComponent from '../components/MainComponents/StatShortComponent';
import TrainingStat from '../components/MainComponents/TrainingStat';
import MuslceTraining from '../components/MainComponents/MuslceTraining';
import {useRoute} from "@react-navigation/native"
import Nav from '../components/MainComponents/Nav';
const Main = styled.View`
  padding: 5px 15px 0 15px;
  backgroundColor: #1D2228;
  height: fit-content;
`

function MainScreen() {
    const route = useRoute();
    const routeName = route.name;
    return (
        <View>
            <Main>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <WelcomeComponent/>
                    <StatShortComponent/>
                    <TrainingStat/>
                    <MuslceTraining/>
                </ScrollView>
            </Main>
            <Nav routeName={routeName}/> 
        </View>
    )
}

export default MainScreen