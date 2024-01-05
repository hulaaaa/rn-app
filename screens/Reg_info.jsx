import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { supabase } from '../lib/supabase'
import { SafeAreaView, Text, Image, View,Alert, TextInput,TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RulerPicker } from 'react-native-ruler-picker';
import { ButtonGroup } from '@rneui/themed';

const Container = styled.View`
  padding: 20px;
  background-color: #1D2228;
  height: 100%;  
  width: 100%;
`
const ButtonStart = styled.TouchableOpacity`
    width: 100%;
    padding: 23px 50px;
    background: #E0FE10;
    border-radius: 17px;
    margin-top: 30px;
`
const LoginDiv = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0;
`
const TextLoginInp = styled.TextInput`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #434C53;
    padding: 15px 15px;
    width: 49%;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.8);
`

function Reg_info({ session }) {
    const navigation = useNavigation();
    // Personal information
    const [name, setName] = useState("");
    const [lname, setLname] = useState("");

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [gender, setGender] = useState(0);
    
    const [loading, setLoading] = useState(false);
    // Function Update
    async function updateProfile({
        name,
        lname,
        weight,
        height,
        gender,
      }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
            const updates = {
                id: session?.user.id,
                first_name:name,
                last_name: lname,
                weight,
                height,
                gender,
                updated_at: new Date(),
            }
            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) {throw error;}
            console.log('Profile updated successfully!');
            navigation.navigate('Main');
        } catch (error) {
            console.error('Error updating profile:', error.message);
            Alert.alert('Error updating profile');
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
                Your body
            </Text>

            <Text 
            style={{
                fontFamily: "Montserrat300",
                color: "#D9D9D9",
                fontSize: 17,
                marginTop: 20,
                marginBottom: 15,
            }}>
                Personal Information
            </Text>
            <LoginDiv>
                <TextLoginInp
                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="First name"
                />
                <TextLoginInp
                    onChangeText={(text) => setLname(text)}
                    value={lname}
                    placeholder="Last name"
                />
            </LoginDiv>


            {/* Gender Text */}
            <Text 
            style={{
                fontFamily: "Montserrat300",
                color: "#D9D9D9",
                fontSize: 17,
                marginTop: 20,
                marginBottom: 15,
            }}>
                Gender
            </Text>
            {/* Select Gender */}
            <View style={{
                width: "100%",
                height: "fit-content",
                margin: "50px 0"
            }}
            >
                <ButtonGroup
                    buttons={['Male', 'Female']}
                    selectedIndex={gender}
                    onPress={(value) => {
                        setGender(value);
                    }}
                    textStyle={{
                        fontFamily: "Montserrat300",
                        fontSize: 16,
                    }}
                    selectedButtonStyle={{
                        backgroundColor: "#E0FE10"
                    }}
                    selectedTextStyle={{
                        color: "#000"
                    }}
                    buttonStyle={{
                        borderRadius: 25,
                        backgroundColor: "transparent",
                    }}
                    buttonContainerStyle={{
                        border: "0px solid transparent",
                    }}
                    containerStyle={{
                        backgroundColor: "transparent",
                        borderRadius: 25,
                        border: "2px solid red",
                    }}
                    innerBorderStyle={{
                        color: "transparent",
                        width: 0,
                    }}
                    disabledSelectedTextStyle={{
                        color: "red"
                    }}
                />
            </View>
            
            
            {/* Weight Text */}
            <Text 
            style={{
                fontFamily: "Montserrat300",
                color: "#D9D9D9",
                fontSize: 17,
                marginTop: 40,
                marginBottom: 15,
            }}>
                Weight
            </Text>
            {/* Weight Select */}
            <RulerPicker
                min={30}
                width={360}
                height={120}
                max={130}
                step={1}
                shortStepColor="white"
                valueTextStyle={{
                    color: "white"
                }}
                unitTextStyle={{
                    color: "white"
                }}
                longStepColor="rgba(224, 254, 16, 0.30)"
                indicatorColor="#E0FE10"
                fractionDigits={0}
                initialValue={30}
                shortStepHeight={15}
                longStepHeight={25}
                indicatorHeight={50}
                unit="kg"
                onValueChangeEnd={(number) => setWeight(number)}
            />


            {/* Height Text */}
            <Text 
            style={{
                fontFamily: "Montserrat300",
                color: "#D9D9D9",
                fontSize: 17,
                marginTop: 40,
                marginBottom: 15,
            }}>
                Height
            </Text>
            {/* Height Select */}
            <RulerPicker
                min={120}
                width={360}
                height={120}
                max={220}
                step={1}
                shortStepColor="white"
                valueTextStyle={{
                    color: "white"
                }}
                unitTextStyle={{
                    color: "white"
                }}
                longStepColor="rgba(224, 254, 16, 0.30)"
                indicatorColor="#E0FE10"
                fractionDigits={0}
                initialValue={120}
                shortStepHeight={15}
                longStepHeight={25}
                indicatorHeight={50}
                unit="cm"
                onValueChangeEnd={(number) => setHeight(number)}
            />


            {/* Finish Button */}
            <ButtonStart disabled={loading} onPress={() => updateProfile({name, lname,weight,height,gender})}>
                <Text
                    style={{
                    fontSize: 15,
                    fontFamily: "Montserrat700",
                    color: "#1D2900",
                    textAlign: "center"
                    }}
                >
                    LET'S GO
                </Text>
            </ButtonStart>
        </Container>
    )
}
export default Reg_info;

