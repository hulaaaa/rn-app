import { View, Image, TouchableOpacity,Text } from 'react-native';
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
      <TouchableOpacity >
        <AvatarImage source={require('../../assets/avatarka.png')} />
      </TouchableOpacity>
      <NameText>{name} {lname}</NameText>
      <EmailText>{session?.user?.email}</EmailText>
    </Container>
  );
}

export default PhotoProfile;
