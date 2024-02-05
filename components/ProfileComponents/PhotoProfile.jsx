import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
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

  return (
    <Container>
      <TouchableOpacity onPress={openImagePicker}>
        <AvatarImage source={require('../../assets/avatarka.png')} />
      </TouchableOpacity>
      {errorMessage && <NameText style={{ color: 'red' }}>{errorMessage}</NameText>} 
      <NameText>{name} {lname}</NameText>
      <EmailText>{session?.user?.email}</EmailText>
    </Container>
  );
}

export default PhotoProfile;
