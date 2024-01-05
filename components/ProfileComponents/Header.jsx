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

const SvgComponent = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <Path
        fill="#FCFCFC"
        d="M20 11.25a1.25 1.25 0 1 0 0-2.5v2.5ZM1.116 9.116a1.25 1.25 0 0 0 0 1.768l7.955 7.955a1.25 1.25 0 1 0 1.768-1.768L3.768 10l7.07-7.071A1.25 1.25 0 1 0 9.072 1.16L1.116 9.116ZM20 8.75H2v2.5h18v-2.5Z"
      />
    </Svg>
)

function Header() {
  const navigation = useNavigation();

  return (
    <Container>
        <TouchableOpacity
          onPress={()=> navigation.navigate('Main')}
          style={{
            width: 18,
            height: 19
          }}
        >
          <SvgComponent/>
        </TouchableOpacity>
        
        <Text 
        style={{
            fontFamily: "Montserrat700",
            color: "#FEFFFF",
            fontSize: 17
        }}>
            Profile
        </Text>

        <TouchableOpacity
          style={{
            width: 18,
            height: 19
          }}
        >
          
        </TouchableOpacity>
    </Container>
  )
}

export default Header