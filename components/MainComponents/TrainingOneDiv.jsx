import { StyleSheet, Text, View,Image, ScrollView,TouchableOpacity } from 'react-native';
import styled from "styled-components"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Svg, { Rect, Path } from "react-native-svg"

const TrainingOneContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    height: ${RFValue(180)}px;
    border-radius: 17px;

`
const TrainingImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 17px;
    backgroundColor: '#000000';
    opacity: 0.5;
`
const TextTrainDiv = styled.View`
    position: absolute;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 100%;
    padding: 20px;
`
const PlaySVG = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <Rect width={65} height={65} fill="#E0FE10" rx={32.5} />
      <Path fill="#000" d="M39.513 29.923c1.953 1.163 1.953 3.99 0 5.154l-8.712 5.193c-2 1.191-4.536-.25-4.536-2.577V27.307c0-2.327 2.536-3.768 4.536-2.577l8.712 5.193Z"/>
    </Svg>
)
function TrainingOneDiv({text,time}) {
    
  return (
    <TrainingOneContainer>
        {text === "BICEPS" && <TrainingImage source={require(`../../assets/image/biceps.jpg`)}/>}
        {text === "BACK" && <TrainingImage source={require(`../../assets/image/back.jpg`)}/>}
        {text === "ABS" && <TrainingImage source={require(`../../assets/image/abs.jpg`)}/>}
        <TextTrainDiv>
            <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px"
            }}
            >
                <Text
                style={{
                    color: "#FFFEFF",
                    fontFamily: "Montserrat700",
                    fontSize: RFValue(25)
                }}
                >
                { `${text}\nWORKOUT` }
                </Text>
                <Text
                style={{
                    color: "#FFFEFF",
                    fontFamily: "Montserrat700",
                    fontSize: RFValue(15),
                }}
                >
                    {time} MIN
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <PlaySVG/>
            </TouchableOpacity>
        </TextTrainDiv>
    </TrainingOneContainer>
  )
}
export default TrainingOneDiv
