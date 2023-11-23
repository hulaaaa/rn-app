import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Svg, { Path } from "react-native-svg"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
  display: flex;   
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 0;
  margin: 0;
  padding-top: 30px;
`
const AvatarImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 6px;
`;

const NameText = styled.Text`
  font-family: 'Montserrat700';
  color: #FEFFFF;
  font-size: ${RFValue(17)}px;
`;

const EmailText = styled.Text`
  font-family: 'Montserrat300';
  color: #8F9094;
  font-size: ${RFValue(10)}px;
`;

function PhotoProfile() {
  return (
    <Container>
      <AvatarImage source={require('../../assets/avatarka.png')} />
      <NameText>Dmytro Hula</NameText>
      <EmailText>huladm@icloud.com</EmailText>
    </Container>
  )
}

export default PhotoProfile