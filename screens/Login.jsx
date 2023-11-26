import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { SafeAreaView, Text, Image, View, TextInput,TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 40px 20px;
  background-color: #1D2228;
  height: 100%;  
  width: 100%;
`
const InputsDiv = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`
const LoginDiv = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`
const TextLoginInp = styled.TextInput`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    border: 1px solid #2A2E37;
    padding: 20px 15px;
    width: 100%;
    border-radius: 17px;
    color: #FEFFFF;
`
const TextPassInp = styled.TextInput`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    border: 1px solid #2A2E37;
    padding: 20px 15px;
    width: 100%;
    border-radius: 17px;
    color: #FEFFFF;
`
const ButtonStart = styled.TouchableOpacity`
    width: 100%;
    padding: 23px 50px;
    background: #E0FE10;
    border-radius: 17px;
    margin-top: 50px;
`

function Login() {
    const [text, onChangeText] = useState();
    const [pass, onChangePass] = useState();
    const navigation = useNavigation();

  return (
    <Container>
        <Text 
        style={{
                fontFamily: "Montserrat700",
                color: "#FEFFFF",
                fontSize: 35
        }}>
            Login
        </Text>
        <InputsDiv>
            <LoginDiv>
                <TextLoginInp
                onChangeText={onChangeText}
                value={text}
                placeholder="Login"
                />
            </LoginDiv>
            <LoginDiv>
                <TextPassInp
                onChangeText={onChangePass}
                value={pass}
                secureTextEntry={true}
                placeholder="Password"
                />
            </LoginDiv>
            <ButtonStart onPress={()=>navigation.navigate('Main')}>
                <Text
                style={{
                fontSize: 15,
                fontFamily: "Montserrat700",
                color: "#1D2900",
                textAlign: "center"
                }}
                >
                    SIGN IN
                </Text>
            </ButtonStart>
        </InputsDiv>
        
    </Container>
  )
}

export default Login