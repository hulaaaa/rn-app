import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import Header from '../components/ProfileComponents/Header';
import PhotoProfile from '../components/ProfileComponents/PhotoProfile';
import MiniDivInfo from '../components/ProfileComponents/MiniDivInfo';
import Nav from '../components/MainComponents/Nav';
import {useRoute} from "@react-navigation/native"
import LastActiv from '../components/ProfileComponents/LastActiv';

const Main = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px 20px 0 20px;
  background-color: #1D2228; 
  height: 100%;
`

function Profile() {
  const route = useRoute();
  const routeName = route.name;
  return (
    <View>
      <Main>
      <Header/>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <PhotoProfile/>
          <MiniDivInfo/>
          <LastActiv/>
        </ScrollView>
      </Main>
      <Nav routeName={routeName}/>
    </View>
  )
}

export default Profile