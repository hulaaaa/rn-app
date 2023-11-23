import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import Svg, { Path } from "react-native-svg"

const IconWeight = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      stroke="#D3E673"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.889 32.111h6.222C25.89 32.111 29 29 29 21.222V11.89C29 4.11 25.889 1 18.111 1H11.89C4.11 1 1 4.111 1 11.889v9.333C1 29 4.111 32.112 11.889 32.112Z"
    />
    <Path
      stroke="#D3E673"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23.167 10.784c-4.651-4.137-11.682-4.137-16.334 0l3.392 5.445a7.175 7.175 0 0 1 9.55 0l3.392-5.444Z"
    />
  </Svg>
)
const IconHeight = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <Path
        stroke="#D3E673"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 24.333V5.667m0 18.666-4.667-3.11M15 24.332l4.667-3.11M15 5.666l-4.667 3.11M15 5.668l4.667 3.11M29 1H1m28 28H1"
      />
    </Svg>
)
const IconGender = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <Path
        stroke="#D3E673"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.7 19.9a9.1 9.1 0 1 1-9.1-9.1 9.1 9.1 0 0 1 9.1 9.1ZM19.7 1h9.8v9.8M17.6 12.9 29.5 1"
      />
    </Svg>
)
const Container = styled.View`
  display: flex;   
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  padding-top: 20px;
`
const MiniDiv = styled.View`
  display: flex;   
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0;
  margin: 0;
  width: 32%;
  aspect-ratio: 1/1;
  background-color: #2A2E37;
  
  border-radius: 17px;
`


function MiniDivInfo() {
    const miniDivArr = [
        {
            icon: (<IconWeight/>),
            title: "91",
            desc: "Weight (kg)"
        },
        {
            icon: (<IconHeight/>),
            title: "1,83",
            desc: "Height (m)"
        },
        {
            icon: (<IconGender/>),
            title: "Male",
            desc: "Gender"
        },
    ]
    return (
        <Container>
            {
                miniDivArr?.map((item, index)=>(
                    <MiniDiv key={index}>
                        <View
                        style={{
                            width: 30,
                            height: 33,
                            padding: 0,
                            margin: 0
                        }}
                        >
                            {item.icon}
                        </View>
                        
                        <Text
                            style={{
                                color: "#FAFBFD",
                                fontFamily: "Montserrat700",
                                fontSize: 17
                            }}
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={{
                                color: "#A5A8AD",
                                fontFamily: "Montserrat300",
                                fontSize: 12
                            }}
                        >
                            {item.desc}
                        </Text>
                    </MiniDiv>
                ))
            }
        </Container>
    )
}

export default MiniDivInfo