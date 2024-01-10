import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../../lib/supabase';
import React, { useEffect, useState } from 'react';

const WelcomeDiv = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 65px;
    gap: 10px;
    margin-bottom: 3%;
`
const AvatarImage = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
`;
const WelcomeTextDiv = styled.View`
    display: flex;
    flex-direction: column;
    gap: 5px;
    alignItems: flex-start;
`;

function WelcomeComponent({session,lname,fname}) {
    const navigation = useNavigation();
    const [avatarUrl, setAvatarUrl] = useState(null);

    async function getPhoto() {
      try {
        const { data, error } = await supabase.storage.from('avatars').download('admin1.jpeg');
  
        if (error) {
          console.error('Error downloading image:', error);
        } else {
          const imageUrl = URL.createObjectURL(data);
          setAvatarUrl(imageUrl);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    }
  
    useEffect(() => {
      getPhoto();
    }, []);
    return (
        <WelcomeDiv
            onPress={()=>navigation.navigate('Profile')}
        >
            {avatarUrl ? (
                <AvatarImage source={{ uri: avatarUrl }} />
            ) : (
                <AvatarImage source={require('../../assets/avatarka.png')}/>
                )}
            <WelcomeTextDiv>
                <Text 
                style={{
                        fontFamily: "Montserrat300",
                        color: "#A5A8AD",
                        fontSize: 17
                }}>
                    Welcome back,
                </Text>
                <Text 
                style={{
                    fontFamily: "Montserrat700",
                    color: "#FEFFFF",
                    fontSize: 17
                }}>
                    {fname} {lname}
                </Text>
            </WelcomeTextDiv>
            
        </WelcomeDiv>
    )
}

export default WelcomeComponent