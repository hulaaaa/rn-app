import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from "@react-navigation/native";

const WelcomeDiv = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 65px;
    gap: 10px;
    margin-bottom: 3%;
`
const AvatarImage = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
`;
const WelcomeTextDiv = styled.View`
    display: flex;
    flex-direction: column;
    gap: 5px;
    alignItems: flex-start;
`;

function WelcomeComponent() {
    const navigation = useNavigation();

    return (
        <WelcomeDiv
            onPress={()=>navigation.navigate('Profile')}
        >
            <AvatarImage source={require('../../assets/avatarka.png')}/>
            <WelcomeTextDiv>
                <Text 
                style={{
                        fontFamily: "Montserrat300",
                        color: "#A5A8AD",
                        fontSize: 17
                }}>
                    Welcome back,
                </Text>
                <Text 
                style={{
                    fontFamily: "Montserrat700",
                    color: "#FEFFFF",
                    fontSize: 17
                }}>
                    DMYTRO HULA
                </Text>
            </WelcomeTextDiv>
            
        </WelcomeDiv>
    )
}

export default WelcomeComponent