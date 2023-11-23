import { StyleSheet, Text, View,Image, ScrollView } from 'react-native';
import styled from "styled-components"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Svg, { Rect, Path } from "react-native-svg"
import TrainingOneDiv from './TrainingOneDiv';

const Container = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-top: 3,5%;
`
const TextDiv = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 30px;
`
const TrainingDiv = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-top: 4%;
    margin-bottom: 100px;
`

function MuslceTraining() {
    const trainingArr = [
        {
            time: "5-8",
            text: "BICEPS",
        },
        {
            time: "9-12",
            text: "BACK",
        },
        {
            time: "13-18",
            text: "ABS",
        },
    ]
    return (
        <Container>
            <TextDiv>
                <Text 
                style={{
                    fontFamily: "Montserrat700",
                    color: "#A5A8AD",
                    fontSize: RFValue(17)
                }}>
                    MUSCLE TRAINING
                </Text>
                <Text 
                style={{
                    fontFamily: "Montserrat300",
                    color: "#A5A8AD",
                    fontSize: RFValue(15)
                }}>
                    VIEW ALL
                </Text>
            </TextDiv>
            <TrainingDiv>
                { 
                    trainingArr?.map((item, index)=>(
                            <TrainingOneDiv 
                                key={index} 
                                time={item.time} 
                                text={item.text} 
                                img={item.img}
                            />
                        )
                    )
                }
            </TrainingDiv>
        </Container>
  )
}

export default MuslceTraining