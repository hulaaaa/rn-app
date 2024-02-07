import {useNavigation} from "@react-navigation/native";
import {useState} from 'react';
import {supabase} from '../lib/supabase'
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 20px;
  background-color: #1D2228;
  height: 100%;
  width: 100%;
`
const InputsDiv = styled.View`
  display: flex;
  width: 100%;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const LoginDiv = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`
const TextLoginInp = styled.TextInput`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #434C53;
  padding: 15px 15px;
  width: 100%;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
`
const TextPassInp = styled.TextInput`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #434C53;
  padding: 15px 15px;
  width: 100%;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
`
const ButtonStart = styled.TouchableOpacity`
  width: 100%;
  padding: 23px 50px;
  background: #E0FE10;
  border-radius: 17px;
  margin-top: 30px;
`

function Register() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const [passwordMismatch, setPasswordMismatch] = useState(false);


    async function signUpWithEmail() {

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        setLoading(true);
        const {data: {session}, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert(error.message);
            setPasswordMismatch(false);
        } else if (!session) {
            Alert.alert('Please check your inbox for email verification!');
            setPasswordMismatch(false);
        } else {
            navigation.navigate('Reginfo');
        }

        setLoading(false);
    }

    return (
        <Container>
            <Text
                style={{
                    fontFamily: "Montserrat700",
                    color: "#FEFFFF",
                    fontSize: 30
                }}>
                Registration
            </Text>

            <InputsDiv>
                {/* EMAIL */}
                <LoginDiv>
                    <TextLoginInp
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email"
                    />
                </LoginDiv>


                {/* Password text */}
                <View style={{
                    display: 'flex',
                    width: "100%",
                    marginEnd: 10,
                    marginLeft: 15,
                }}>
                    <Text
                        style={{
                            fontFamily: "Montserrat300",
                            color: "#D9D9D9",
                            fontSize: 17,
                            marginTop: 20,
                        }}>
                        Password
                    </Text>
                </View>
                <LoginDiv>
                    <TextPassInp
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                </LoginDiv>
                <LoginDiv>
                    <TextPassInp
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        secureTextEntry={true}
                        placeholder="Confirm password"
                    />
                </LoginDiv>

                {/* Display error message if passwords don't match */}
                {passwordMismatch && (
                    <Text style={{color: 'red'}}>Passwords do not match</Text>
                )}
                {/* BUTTON SIGN UP */}
                <ButtonStart
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontFamily: "Montserrat700",
                            color: "#1D2900",
                            textAlign: "center"
                        }}
                    >
                        SIGN UP
                    </Text>
                </ButtonStart>

                {/* textLogin */}
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center"
                }}>
                    <Text
                        style={{
                            fontFamily: "Montserrat300",
                            color: "#E5E8ED",
                            fontSize: 12,
                            marginTop: 5,
                        }}>
                        IF YOU HAVE AN ACCOUNT?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{
                            fontFamily: "Montserrat700",
                            color: "#E5E8ED",
                            fontSize: 12,
                            marginTop: 5,
                            padding: 12,
                            textDecorationLine: 'underline'
                        }}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                </View>
            </InputsDiv>
        </Container>
    )
}

export default Register;