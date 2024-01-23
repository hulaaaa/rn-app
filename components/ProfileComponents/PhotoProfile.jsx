import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import { supabase } from '../../lib/supabase';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 0;
  margin: 0;
  padding-top: 30px;
`;

const AvatarImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 6px;
`;

const NameText = styled.Text`
  font-family: 'Montserrat700';
  color: #feffff;
  font-size: 17px;
`;

const EmailText = styled.Text`
  font-family: 'Montserrat300';
  color: #8f9094;
  font-size: 10px;
`;

function PhotoProfile({ session, name, lname }) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const getPhoto = async () => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download('admin1.jpeg');

      if (error) {
        console.error('Error downloading image:', error);
      } else {
        const imageUrl = data ? data.publicURL : null;
        setAvatarUrl(imageUrl);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const openImagePicker = async () => {
    try {
      let result;
      if (Platform.OS === 'ios') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
        });
      }

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        uploadImage(uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

      if (base64 && base64.length > 0) {
        const user_id = session.user.id;
        const fileName = `${user_id}`;

        const { data, error } = await supabase.storage.from('avatars').upload(fileName, base64, {
          cacheControl: '3600',
          contentType: 'image/png',
        });

        if (error) {
          console.error('Error uploading image:', error);
        } else {
          const imageUrl = data.publicURL;
          setAvatarUrl(imageUrl);
          console.log('Image uploaded successfully!: ', data.publicURL);
        }
      } else {
        console.error('Empty base64 string received');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <Container>
      <TouchableOpacity onPress={openImagePicker}>
        <AvatarImage source={avatarUrl ? { uri: avatarUrl } : require('../../assets/avatarka.png')} />
      </TouchableOpacity>
      <NameText>
        {name} {lname}
      </NameText>
      <EmailText>{session?.user?.email}</EmailText>
    </Container>
  );
}

export default PhotoProfile;
