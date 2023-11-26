import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { supabase } from '../lib/supabase'
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
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) Alert.alert(error.message)
        setLoading(false)
        if (!error) {
            navigation.navigate('Main');
        }
    }
    
    async function signUpWithEmail() {
      setLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message)
      if (!session) Alert.alert('Please check your inbox for email verification!')
      setLoading(false)
    }
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
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email"
                />
            </LoginDiv>

            <LoginDiv>
                <TextPassInp
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                />
            </LoginDiv>

            <ButtonStart 
            disabled={loading} onPress={() => {signInWithEmail()}} 
            >
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

            <ButtonStart 
            disabled={loading} onPress={() => {signUpWithEmail()}} 
            >
                <Text
                style={{
                fontSize: 15,
                fontFamily: "Montserrat700",
                color: "#1D2900",
                textAlign: "center"
                }}
                >
                    SIGN Up
                </Text>
            </ButtonStart>
        </InputsDiv>
        
    </Container>
  )
}

export default Login