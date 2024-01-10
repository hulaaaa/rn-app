import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import Svg, { Path } from "react-native-svg"
import { useNavigation } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
  display: flex;   
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  padding-bottom: 5px;
`


function Header({text}) {
  const navigation = useNavigation();

  return (
    <Container>
        <TouchableOpacity style={{width: 18,height: 19}}></TouchableOpacity>
        
        <Text 
        style={{
            fontFamily: "Montserrat700",
            color: "#FEFFFF",
            fontSize: 17
        }}>
            {text}
        </Text>

        <TouchableOpacity style={{width: 18,height: 19}}></TouchableOpacity>
    </Container>
  )
}

export default Header