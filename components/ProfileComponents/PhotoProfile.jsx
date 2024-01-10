import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Svg, { Path } from "react-native-svg"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { supabase } from '../../lib/supabase';
import React, { useEffect, useState } from 'react';

const Container = styled.View`
  display: flex;   
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 0;
  margin: 0;
  padding-top: 30px;
`
const AvatarImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 6px;
`;

const NameText = styled.Text`
  font-family: 'Montserrat700';
  color: #FEFFFF;
  font-size: ${RFValue(17)}px;
`;

const EmailText = styled.Text`
  font-family: 'Montserrat300';
  color: #8F9094;
  font-size: ${RFValue(10)}px;
`;

function PhotoProfile({session,name,lname}) {
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
    <Container>
      {avatarUrl ? (
        <AvatarImage source={{ uri: avatarUrl }} />
      ) : (
        <AvatarImage source={require('../../assets/avatarka.png')} />
      )}
      <NameText>{name} {lname}</NameText>
      <EmailText>{session?.user?.email}</EmailText>
    </Container>
  )
}

export default PhotoProfile