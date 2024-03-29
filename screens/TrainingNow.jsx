import React, { useState,useRef, useEffect } from 'react';
import { Text, Alert, View, TouchableOpacity, Dimensions,Image } from 'react-native';
import styled from 'styled-components';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Rect, Path, Defs, Circle } from "react-native-svg";
import * as Progress from 'react-native-progress';
import { supabase } from '../lib/supabase';
import SwiperFlatList from 'react-native-swiper-flatlist';


const CancelGoSvg = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={61} height={61}>
      <G filter="url(#a)">
        <Rect width={61} height={61} fill="#2A2E37" rx={30.5} />
      </G>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M24 37.588 37.588 24M24.412 24 38 37.588"
      />
      <Defs></Defs>
    </Svg>
  </TouchableOpacity>
);

const KcalSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} height={18}>
    <Path
      fill="#fff"
      d="m7.523 0-.492.422S5.276 1.854 3.54 3.937C1.802 6.021 0 8.77 0 11.649c0 2.075.85 3.803 2.227 4.97 1.292 1.092 3.02 1.684 4.898 1.757.126.006.249.023.375.023s.249-.017.375-.023c1.878-.073 3.606-.665 4.898-1.758C14.15 15.451 15 13.723 15 11.648c0-2.592-1.81-5.294-3.54-7.453C9.733 2.036 8.017.445 8.017.445L7.523 0Zm-.046 2.086c.39.37 1.412 1.295 2.812 3.047 1.646 2.06 3.211 4.684 3.211 6.515 0 1.676-.65 2.948-1.71 3.844-.259.217-.54.416-.845.586.185-.442.305-.923.305-1.43 0-4.687-2.508-7.546-2.508-7.546l-1.36-1.524.048 2.04s.003.954-.117 1.874c-.062.46-.147.917-.258 1.172-.033.073-.047.082-.07.117a1.653 1.653 0 0 1-.54-.375 3.908 3.908 0 0 1-.422-.515l-.726-1.125-.563 1.218s-.984 2.007-.984 4.664c0 .507.12.988.305 1.43a5.401 5.401 0 0 1-.844-.586C2.15 14.596 1.5 13.324 1.5 11.648c0-2.217 1.573-4.784 3.21-6.75C6.1 3.234 7.085 2.42 7.478 2.086Zm1.265 7.898a11.02 11.02 0 0 1 1.008 4.664 2.25 2.25 0 0 1-4.5 0c0-1.195.231-2.206.445-2.93.337.303.75.61 1.36.61.357 0 .697-.164.914-.375.217-.21.34-.46.445-.703.17-.396.258-.835.328-1.266Z"
    />
  </Svg>
);

const PauseSvg = ({ onPress,isPaused }) => (
  <TouchableOpacity onPress={onPress}>
    {
        isPaused?(
            <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={105} height={105}>
                <Rect width={105} height={105} fill="#E0FE10" rx={52.5} />
                <Path
                fill="#000"
                d="M66.49 49.923c1.952 1.163 1.952 3.99 0 5.154L46.962 66.714c-2 1.192-4.536-.249-4.536-2.577V40.863c0-2.328 2.536-3.77 4.536-2.578l19.526 11.638Z"
                />
            </Svg>
        ):(
            <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={105} height={105}>
            <Circle cx={52.5} cy={52.5} r={52.5} fill="#E0FE10" />
            <Path
                stroke="#000"
                strokeLinecap="round"
                strokeWidth={3}
                d="M47 43v20M58.5 43v20"
            />
            </Svg>
        )
    }
  </TouchableOpacity>
);

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: #1D2228;
`;

const TrainImg = styled.Image`
  width: 93%;
  height: 300px;
  border-radius: 20px;
`;
const ImageWelcomeDiv = styled.View`
  width: 100vw;
  height: 300px;
`
const BottoMenu = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 45%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 15px;
  padding-bottom: 40px;
  background: #2A2E37;
  border-radius: 30px;
`;

const CompletDiv = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const LoadLine = styled.View`
  margin-top: 15px;
`;

const TextTime = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BtnDiv = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.View`
  padding: 10px 15px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const CustomSlide = ({ backgroundColor, text, onPress, img }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      {text === 'image' ? (
        <TrainImg source={{ uri: img }} />
      ) : (
        <View
          style={{
            width: '93%',
            height: '100%',
            borderRadius: 20,
            backgroundColor: backgroundColor,
            alignItems: 'center',
            padding: 20,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white',textAlign: 'center', fontFamily: 'Montserrat700', fontSize: 15 }}>{text}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);


function TrainingNow() {
    const [progress, setProgress] = useState(0);
    const [calories, setCalories] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [trainingCompleted, setTrainingCompleted] = useState(false); 
    const route = useRoute();
    const navigation = useNavigation();
    const { session } = route.params || {};
    const { item } = route.params || {}
    const durationExercise_min = item.exercise_duration;

    async function loadTrain() {
      try {
          setLoading(true);
          if (!session?.user) throw new Error('No user on the session!')
          const { data: userProfile, error: profileError } = await supabase
              .from('users_profile')
              .select('kcal_count, train_count')
              .eq('user_id', session?.user?.id)
              .single();
  
          if (profileError) throw profileError;
  
          const { kcal_count: currentKcalCount, train_count: currentTrainCount } = userProfile;
  
          const updates = {
              kcal_count: currentKcalCount + item.exercise_kcal,
              train_count: currentTrainCount + 1,
          };
          const { error } = await supabase
              .from('users_profile')
              .update(updates)
              .eq('user_id', session?.user?.id);
  
          if (error) throw error;
          const trainingUpdates = {
              training_date: new Date().toLocaleDateString(),
              training_time: durationExercise_min,
              exercise_id: item.id,
              user_id: session?.user?.id,
          };
          const { trainingError } = await supabase.from('services_latesttraining').upsert(trainingUpdates);
          if (trainingError) throw trainingError;
  
          console.log('Profile and training data updated successfully!');
          Alert.alert("Ти молодець, вправа виконана!")
          navigation.navigate('Main');
      } catch (error) {
          console.error('Error loading training:', error.message);
          Alert.alert('Error loading training');
      } finally {
          setLoading(false);
      }
  }
    useEffect(() => {
        let intervalId
        const caloriesPerMinute = item.exercise_kcal / durationExercise_min
        const updateTimer = () => {
            if (!isPaused && !trainingCompleted) {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer + 1;
                    const newCalories = calories + caloriesPerMinute / 60;
                    if (newTimer >= durationExercise_min * 60) {
                        clearInterval(intervalId);
                        setTrainingCompleted(true); 
                        loadTrain()
                    }
                    setCalories(newCalories);
                    setProgress((newTimer / (durationExercise_min * 60)) * 100);
                    return Math.min(newTimer, durationExercise_min * 60);
                });
            }
        };
        intervalId = setInterval(updateTimer, 1000);
        return () => clearInterval(intervalId);
    }, [isPaused, durationExercise_min, item.exercise_kcal, calories, trainingCompleted]);
    const togglePause = () => {
        setIsPaused((prevIsPaused) => !prevIsPaused);
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText(!showText);
  };
    return (
      <Container>
        <Header>
          <View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Text style={{
                color: "#FFF",
                fontFamily: "Montserrat700",
                fontSize: 32,
              }}>
                {calories.toFixed(0)} / {item.exercise_kcal}
              </Text>
              <KcalSvg />
            </View>
            <Text style={{
              color: "#FFF",
              fontFamily: "Montserrat300",
              fontSize: 15,
            }}>
              KCAL BURNED
            </Text>
          </View>
  
          <CancelGoSvg onPress={() => { navigation.navigate('Main') }} />
        </Header>
  
        <ImageWelcomeDiv>
          <CustomSlide
            backgroundColor="#2A2E37"
            text={showText ? "image": item.exercise_desc}
            onPress={() => setShowText(!showText)}
            img={item.exercise_image}
          />
        </ImageWelcomeDiv>

        <BottoMenu>
          <View style={{
            width: 87,
            height: 4,
            borderRadius: 10,
            backgroundColor: "rgba(255, 255, 255, 0.10)"
          }} />
  
          <CompletDiv>
            <TextTime>
              <View>
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Montserrat500",
                  fontSize: 35,
                }}>
                  {formatTime(timer)}
                </Text>
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Montserrat300",
                  fontSize: 14,
                }}>
                  TOTAL TIME
                </Text>
              </View>
  
              <View style={{ display: 'flex', flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Montserrat500",
                  fontSize: 35,
                }}>
                  {Math.round(progress)}%
                </Text>
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Montserrat300",
                  fontSize: 14,
                }}>
                  COMPLETED
                </Text>
              </View>
            </TextTime>
  
            <LoadLine>
              <Progress.Bar progress={progress / 100} animated={true} borderColor={'#3F434B'} width={null} color={'#E0FE10'} />
            </LoadLine>
          </CompletDiv>
  
          <BtnDiv>
            <TouchableOpacity onPress={togglePause}>
                <Text style={{
                color: "transparent",
                fontFamily: "Montserrat300",
                fontSize: 25,
                marginLeft: 20
                }}>
                Null
                </Text>
            </TouchableOpacity>
            <PauseSvg onPress={togglePause} isPaused={isPaused}/>
            <Text style={{
                color: "transparent",
                fontFamily: "Montserrat300",
                fontSize: 25,
                marginRight: 20
            }}>
                Null
            </Text>
            </BtnDiv>
        </BottoMenu>
      </Container>
    );
  
}
export default TrainingNow