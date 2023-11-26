import React from 'react';
import { SafeAreaView, Text, Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  padding: 40px 20px;
  background-color: #1D2228;
  height: 100%;  
  width: 100%;

`
const MainDiv = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  jusify-content: space-between;
  width: 100%;
`
const TextWelcomeDiv = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ImageWelcomeDiv = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 60px;
  height: 50%;
`
const ImageWelcome = styled.Image`
  height: 100%;
  width: auto;
  aspect-ratio: 1/1.7;
  border-radius: 17px;
  align-self: center;
`
const ButtonDiv = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const ButtonStart = styled.TouchableOpacity`
    width: 100%;
    padding: 23px 50px;
    background: #E0FE10;
    border-radius: 17px;
    margin-top: 50px;
`

function Welcome() {
  const navigation = useNavigation();

  return (
    <Container>
      <MainDiv>
        <TextWelcomeDiv>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Montserrat300",
              color: "#FEFFFF"
            }}
          >
            IGAINS - WORKOUT PLANNER
          </Text>
          <Text
            style={{
              fontSize: 42,
              marginTop: 20,
              fontStyle: "italic",
              fontFamily: "Montserrat700",
              textAlign: "center",
              color: "#FEFFFF"
            }}
          >
            {`IMPROVE\nYOUR BODY`}
          </Text>
        </TextWelcomeDiv>
        <ImageWelcomeDiv>
          <Swiper
            autoplay
            showsPagination={false}
            autoplayTimeout={1}
          >
            <ImageWelcome
              source={require('../assets/image/back.jpg')}
            />
            <ImageWelcome
              source={require('../assets/image/abs.jpg')}
            />
            <ImageWelcome
              source={require('../assets/image/biceps.jpg')}
            />
          </Swiper>
        </ImageWelcomeDiv>
        <ButtonDiv>
            <ButtonStart onPress={()=>navigation.navigate('Login')}>
                <Text
                style={{
                fontSize: 15,
                fontFamily: "Montserrat700",
                color: "#1D2900"
                }}
                >
                    START BUILDING YOUR BODY
                </Text>
            </ButtonStart>
        </ButtonDiv>
      </MainDiv>
    </Container>
  );
}

export default Welcome;
