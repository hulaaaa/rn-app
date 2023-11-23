import { StyleSheet, Text, View,Image,PixelRatio,Dimensions } from 'react-native';
import styled from 'styled-components';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 32%;
    aspect-ratio : 1 / 1;
    background-color: #2A2E37;
    border-radius: 17px;
    padding: 15px;
`
const deviceHeight = Dimensions.get('window').height;

import Svg, { Path } from 'react-native-svg'
function StatInfo({icon, info, desc}) {
    return (
        <Container>
            <View
            style={{
                width: RFValue(26),
                height: RFValue(26)
            }}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 32" fill="none">
                    <Path
                    d={icon.d}
                    fill="#D3E673"
                    />
                </Svg>   
            </View>
            
            <Text 
            style={{
                fontFamily: "Montserrat700",
                color: "#FAFBFD",
                fontSize: RFValue(12)
            }}>
                {info}
            </Text>
            <Text 
            style={{
                fontFamily: "Montserrat300",
                color: "#A5A8AD",
                fontSize: RFValue(10)
            }}>
                {desc}
            </Text>
        </Container>
    )
}

export default StatInfo