import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import Svg, { Path } from 'react-native-svg';
import ImageProgress from 'react-native-image-progress';

const ArrowGo = () => (
  <View style={{ margin: '20' }}>
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={16} height={16}>
      <Path
        fill="#FEFFFF"
        d="M1 7a1 1 0 0 0 0 2V7Zm15.707 1.707a1 1 0 0 0 0-1.414L10.343.929A1 1 0 1 0 8.93 2.343L14.586 8l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364ZM1 9h15V7H1v2Z"
      />
    </Svg>
  </View>
);

const Main = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  padding-right: 30px;
  width: 100%;
  border-radius: 17px;
  background: #2a2e37;
`;

const TrainImg = styled(ImageProgress)`
  width: 100px;
  height: 100px;
  border-radius: 12px;
`;

function WorkoutDiv({ onPress, text, img, numWork }) {
  const [loading, setLoading] = useState(true);

  return (
    <Main onPress={onPress}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '15px' }}>
        <ImageProgress
          source={{ uri: img }}
          indicator={ActivityIndicator}
          style={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 12 }}
          onLoadEnd={() => setLoading(false)}
        />
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Text style={{ color: '#E0FE10', fontFamily: 'Montserrat700', fontSize: 27 }}>{text}</Text>
          <Text style={{ color: 'rgba(255, 255, 255, 0.80)', fontFamily: 'Montserrat300', fontSize: 12 }}>
            {numWork.length} WORKOUTS
          </Text>
        </View>
      </View>
      <ArrowGo />
    </Main>
  );
}

export default WorkoutDiv;
