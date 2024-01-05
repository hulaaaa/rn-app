import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  display: flex;   
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  flex: 1;
  margin-top: 20px;
`
const TextiAct = styled.View`
  display: flex;   
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  padding: 0;
  margin: 0;
  padding-top: 30px;
`
const ActiveDiv = styled.View`
  display: flex;   
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #2A2E37;
  padding: 20px;
  border-radius: 17px;
`
const TextMore = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 20px;
`

function LastActiv() {
  const activeLatestArr = [
    {
      dateDay: "Wed",
      date: "09",
      title: "BICEPS TRAINING",
      time: "19 MIN"
    },
    {
      dateDay: "Sat",
      date: "10",
      title: "ABS TRAINING",
      time: "12 MIN"
    },
    {
      dateDay: "Mon",
      date: "03",
      title: "BACK TRAINING",
      time: "21 MIN"
    },
  ]
  return (
    <Container>
        <TextiAct>
            <Text
                style={{
                    fontSize: 17,
                    fontFamily: "Montserrat700",
                    color: "#FEFFFF"
                }}
            >
                LATEST ACTIVITES
            </Text>
            {
              activeLatestArr?.map((item, index)=>(
                <ActiveDiv key={index}>
                  <View>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: "Montserrat500",
                            color: "#F0F0F0"
                        }}
                    >
                        {item.dateDay}
                    </Text>
                    <Text
                      style={{
                          fontSize: 12,
                          fontFamily: "Montserrat300",
                          color: "rgba(255, 255, 255, 0.40)"
                      }}
                  >
                      {item.date}
                  </Text>
                  </View>
                  <Text
                  style={{
                      fontSize: 12,
                      fontFamily: "Montserrat700",
                      color: "#E0FE10"
                  }}
                  >
                    {item.title}
                  </Text>
                  <Text
                  style={{
                      fontSize: 12,
                      fontFamily: "Montserrat500",
                      color: "#F0F0F0"
                  }}
                  >
                    {item.time}
                  </Text>
                </ActiveDiv>
              ))
            }
        </TextiAct>
    </Container>
  )
}

export default LastActiv