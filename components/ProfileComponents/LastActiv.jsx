import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import Header from '../components/ProfileComponents/Header';
import PhotoProfile from '../components/ProfileComponents/PhotoProfile';
import MiniDivInfo from '../components/ProfileComponents/MiniDivInfo';
import Nav from '../components/MainComponents/Nav';
import {useRoute} from "@react-navigation/native"

const Container = styled.View`
  display: flex;   
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  padding-top: 20px;
`

function LastActiv() {
  return (
    <Container>
        
    </Container>
  )
}

export default LastActiv