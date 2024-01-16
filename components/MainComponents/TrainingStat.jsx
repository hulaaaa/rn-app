import { View, Text } from "react-native"
import styled from "styled-components"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    width: 100%;
    height: auto;
    border-radius: 17px;
    background: #2A2E37;
    margin-top: 1.5%;
`
const TextDiv = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3%;

`
const DiagramDiv = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`
const ColumnDiagramDiv = styled.View`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

function TrainingStat() {
    const diagram = [
        {
            day: "MON",
            fz: 5,
            active: false
        },
        {
            day: "TUE",
            fz: 3,
            active: false
        },
        {
            day: "WED",
            fz: 6,
            active: false
        },
        {
            day: "THU",
            fz: 8,
            active: true
        },
        {
            day: "FRI",
            fz: 2,
            active: false
        },
        {
            day: "SAT",
            fz: 4,
            active: false
        },
        {
            day: "SUN",
            fz: 6,
            active: false
        },
    ]
    let activeColor = "#434C53"
    return (
        <Container>
            <TextDiv>
                <Text 
                style={{
                    fontFamily: "Montserrat700",
                    color: "#A5A8AD",
                    fontSize: RFValue(17)
                }}>
                    TRAINING
                </Text>
                <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap:RFValue(3)
                }}
                >
                    <Text 
                    style={{
                        fontFamily: "Montserrat300",
                        color: "#A5A8AD",
                        fontSize: RFValue(15)
                    }}>
                        WEEKLY AVERAGE
                    </Text>
                    <Text 
                    style={{
                        fontFamily: "Montserrat700",
                        color: "#A5A8AD",
                        fontSize: RFValue(17)
                    }}>
                        12
                    </Text>
                </View>
                
            </TextDiv>

            <DiagramDiv>
                {
                    diagram.map((item, index)=>(
                        <ColumnDiagramDiv key={index}>
                            
                            <View
                                style={{
                                    borderRadius: "7px",
                                    backgroundColor: item.active==true?activeColor="#E0FE10":activeColor="#434C53",
                                    height: RFPercentage(item.fz),
                                    width: "100%"
                                }}
                            />
                            <Text
                                style={{
                                    color: "#A6ABB1",
                                    fontFamily: "Montserrat300",
                                    fontSize: RFValue(10)
                                }}
                            >
                                {item.day}
                            </Text>
                        </ColumnDiagramDiv>
                    ))
                }
                
                
            </DiagramDiv>

        </Container>
    )
}

export default TrainingStat