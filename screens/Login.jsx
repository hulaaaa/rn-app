import {useNavigation} from "@react-navigation/native";
import {useState} from 'react';
import {supabase} from '../lib/supabase'
import {Text, TouchableOpacity, View} from 'react-native';
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

function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    async function signInWithEmail() {
        setLoading(true);
        setError(null);
        try {
            const {error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setError(error.message);
            } else {
                navigation.navigate('Main');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Text
                style={{
                    fontFamily: "Montserrat700",
                    color: "#FEFFFF",
                    fontSize: 30
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
                {error && (
                    <View style={{marginTop: 10}}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'Montserrat300',
                                color: 'red',
                                textAlign: 'center',
                            }}>
                            {error}
                        </Text>
                    </View>
                )}
                <ButtonStart
                    disabled={loading} onPress={() => {
                    signInWithEmail()
                }}
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

                {/* textLogin */}
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center"
                }}
                >
                    <Text
                        style={{
                            fontFamily: "Montserrat300",
                            color: "#E5E8ED",
                            fontSize: 12,
                            marginTop: 5,
                        }}>
                        YOU DON’T HAVE AN ACCOUNT?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            fontFamily: "Montserrat700",
                            color: "#E5E8ED",
                            fontSize: 12,
                            marginTop: 5,
                            padding: 12,
                            textDecorationLine: 'underline'
                        }}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
            </InputsDiv>

        </Container>
    )
}

export default Login