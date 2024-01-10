import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView ,ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import Svg, { Path } from "react-native-svg"

const Container = styled.View`
  display: flex;   
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px;
  background: #2A2E37;
  border-radius: 20px;

`
const TrainingImage = styled.Image`
    width: 65px;
    aspect-ratio: 2/2;
    border-radius: 10px;
`
const CenterDotSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <Path
        fill="#E0FE10"
        fillRule="evenodd"
        d="M18.07.719a2.454 2.454 0 0 0-3.47 0L9.378 5.942 4.365.929A2.454 2.454 0 1 0 .895 4.4l5.012 5.013L.719 14.6a2.454 2.454 0 1 0 3.47 3.47l5.188-5.187 5.399 5.398a2.454 2.454 0 1 0 3.47-3.47l-5.398-5.399L18.07 4.19a2.454 2.454 0 0 0 0-3.47Z"
        clipRule="evenodd"
      />
    </Svg>
)

function FavExercise({image,title,reps}) {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        const loadImageAssets = async () => {
        try {
            let imageSrc = '';
            switch (image) {
            case 'biceps':
                imageSrc = 'https://waotqiccymmikmwadsdl.supabase.co/storage/v1/object/public/image_ex/biceps.jpg';
                break;
            case 'back':
                imageSrc = 'https://waotqiccymmikmwadsdl.supabase.co/storage/v1/object/public/image_ex/back.jpg';
                break;
            case 'abs':
                imageSrc = 'https://waotqiccymmikmwadsdl.supabase.co/storage/v1/object/public/image_ex/abs.jpg';
                break;
            default:
                break;
            }

            setImageUrl(imageSrc);
            await Image.prefetch(imageSrc);

            setImagesLoaded(true);
        } catch (error) {
            console.error('Error loading images:', error);
        }
        };

        loadImageAssets();
    }, [image]);
    
    return (
    <>
        {
        imagesLoaded ? (
            <Container>
                <View style={{display:"flex",flexDirection: "row",alignItems: "center",gap: "20px",}}>
                {image === "biceps" && <TrainingImage source={{ uri: imageUrl }} />}
                {image === "back" && <TrainingImage source={{ uri: imageUrl }} />}
                {image === "abs" && <TrainingImage source={{ uri: imageUrl }} />}
                    <View style={{display:"flex",flexDirection: "column",alignItems: "flex-start",gap: "8px",}}>
                        <Text style={{color: "#E0FE10",fontFamily: "Montserrat700",fontSize: 15}}>
                            {title}
                        </Text>
                        <Text style={{color: "rgba(255, 255, 255, 0.80)",fontFamily: "Montserrat300",fontSize: 13}}>
                            {reps}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{width: 20,height: 20}}>
                    <CenterDotSvg/>
                </TouchableOpacity>   
            </Container>
            

        ):(
            <ActivityIndicator size="large" color="#E0FE10" />
        )
    }
    </>
  )
}

export default FavExercise