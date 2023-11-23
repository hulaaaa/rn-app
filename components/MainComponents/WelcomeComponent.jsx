import { StyleSheet, Text, View,Image } from 'react-native';
import styled from 'styled-components';

const WelcomeDiv = styled.View`
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
    return (
        <WelcomeDiv>
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