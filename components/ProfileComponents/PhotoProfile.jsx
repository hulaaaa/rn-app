import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from "react-native-responsive-fontsize";
import { supabase } from '../../lib/supabase';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

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

function PhotoProfile({ session, name, lname }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0]?.uri);
      uploadImage();
    } else {
      console.log('User cancelled image picker');
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
  
        if (response.ok) {
          const blob = await response.blob();
  
          if (blob.size > 0) {
            const timestamp = Date.now();
            const fileName = `avatar_${timestamp}.jpeg`;
  
            const { data, error } = await supabase.storage.from('avatars').upload(fileName, blob);
  
            if (error) {
              console.error('Error uploading image:', error);
            } else {
              const imageUrl = URL.createObjectURL(blob);
              setAvatarUrl(imageUrl);
              console.log('Image uploaded successfully!');
            }
          } else {
            console.error('Empty blob received');
          }
        } else {
          console.error('Failed to fetch image:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  
  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <Container>
      <TouchableOpacity onPress={openImagePicker}>
        {selectedImage ? (
          <AvatarImage source={{ uri: selectedImage }} />
        ) : (
          <AvatarImage source={require('../../assets/avatarka.png')} />
        )}
      </TouchableOpacity>
      <NameText>{name} {lname}</NameText>
      <EmailText>{session?.user?.email}</EmailText>
    </Container>
  )
}

export default PhotoProfile;
