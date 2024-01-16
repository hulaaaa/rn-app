import { StyleSheet, Text, Alert, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {useRoute} from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../../lib/supabase';
import Svg, { G, Rect, Path, Defs,Circle } from "react-native-svg"


const ToOpac = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 25px;
    left: 44%;
    z-index: -1;
`
const StartSvg = ({onPress}) => (
    <ToOpac onPress={onPress}>
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={120} height={120}>
            <Path
            fill="#E0FE10"
            d="M120 60c0 33.137-26.863 60-60 60S0 93.137 0 60 26.863 0 60 0s60 26.863 60 60Z"
            />
            <Path
            fill="#2A2E37"
            d="M28.88 68.336a16.01 16.01 0 0 1-2.499-.189 13.144 13.144 0 0 1-2.184-.525 10.501 10.501 0 0 1-1.68-.777l1.911-3.654c.546.308 1.092.567 1.638.777.56.196 1.113.343 1.659.441a9.61 9.61 0 0 0 1.659.147c.434 0 .791-.035 1.071-.105.294-.07.511-.168.651-.294.154-.14.231-.294.231-.462 0-.224-.126-.406-.378-.546s-.588-.266-1.008-.378a28.053 28.053 0 0 0-1.365-.336c-.49-.126-.987-.28-1.491-.462a6.537 6.537 0 0 1-1.386-.735 3.434 3.434 0 0 1-.987-1.113c-.252-.448-.378-.994-.378-1.638 0-1.12.294-2.093.882-2.919.602-.826 1.456-1.463 2.562-1.911 1.12-.462 2.45-.693 3.99-.693 1.092 0 2.107.112 3.045.336.952.21 1.771.518 2.457.924l-1.785 3.612a6.986 6.986 0 0 0-1.932-.819 8.155 8.155 0 0 0-2.1-.273c-.476 0-.875.049-1.197.147-.322.084-.567.203-.735.357-.154.154-.231.315-.231.483 0 .224.126.413.378.567.252.14.588.266 1.008.378.42.098.875.21 1.365.336.504.112 1.001.259 1.491.441.504.168.966.399 1.386.693.42.28.756.644 1.008 1.092.252.434.378.973.378 1.617 0 1.092-.301 2.051-.903 2.877-.602.812-1.463 1.449-2.583 1.911-1.106.462-2.422.693-3.948.693ZM39.83 68l2.164-10.857h-4.305l.777-3.843h13.566l-.777 3.843H46.95L44.787 68H39.83ZM48 68l9.366-14.7h4.872L65.724 68h-4.935l-1.537-10.5L53.229 68H48Zm6.699-2.562 1.995-3.479h3.21l.51 3.479h-5.715ZM66.56 68l2.94-14.7h6.594c1.946 0 3.45.427 4.515 1.281 1.064.84 1.596 2.023 1.596 3.549 0 1.232-.308 2.31-.924 3.234-.602.924-1.463 1.645-2.583 2.163l-3.83-.547-2.281-.335.084-.42L71.516 68H66.56Zm8.988 0-3.024-5.355 6.174.882L80.693 68h-5.145Zm-3.003-5.187.388-2.313 2.09.066c.686 0 1.218-.168 1.596-.504.378-.35.567-.833.567-1.449 0-.532-.168-.91-.504-1.134-.322-.238-.77-.357-1.344-.357H73.5l-.955 5.691ZM85.194 68l2.163-10.857h-4.305l.777-3.843h13.566l-.777 3.843h-4.305L90.15 68h-4.956Z"
            />
        </Svg>
    </ToOpac>
    
)
const BackGoSvg = ({onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={61} height={61}>
            <G filter="url(#a)">
            <Rect width={61} height={61} fill="#E0FE10" rx={30.5} />
            </G>
            <Path
            stroke="#151514"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="m33 25-4.793 4.793a1 1 0 0 0 0 1.414L33 36"
            />
            <Defs></Defs>
        </Svg>
    </TouchableOpacity>
)
const LoveSvg = () => (
    <TouchableOpacity>
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={61} height={61}>
            <G filter="url(#a)">
            <Rect width={61} height={61} fill="#E0FE10" rx={30.5} />
            </G>
            <Path
            fill="#E0FE10"
            stroke="#151514"
            d="M38.34 30.143c-.194.928-.737 1.859-1.484 2.747-.744.885-1.665 1.7-2.572 2.396A26.942 26.942 0 0 1 31 37.432a26.942 26.942 0 0 1-3.284-2.146c-.907-.696-1.829-1.511-2.572-2.396-.747-.888-1.29-1.819-1.484-2.747-.404-1.93-.002-3.33.736-4.238.744-.918 1.878-1.398 3.048-1.398h.03a3.72 3.72 0 0 1 1.778.333c.549.254 1.01.636 1.34 1.102l.408.577.408-.577c.33-.466.791-.848 1.34-1.102a3.72 3.72 0 0 1 1.778-.334l.015.001h.015c1.17 0 2.303.48 3.048 1.398.738.909 1.14 2.307.736 4.238Z"
            />
            <Defs></Defs>
        </Svg>
    </TouchableOpacity>
)
const KcalSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} height={18}>
    <Path
      fill="#fff"
      d="m7.523 0-.492.422S5.276 1.854 3.54 3.937C1.802 6.021 0 8.77 0 11.649c0 2.075.85 3.803 2.227 4.97 1.292 1.092 3.02 1.684 4.898 1.757.126.006.249.023.375.023s.249-.017.375-.023c1.878-.073 3.606-.665 4.898-1.758C14.15 15.451 15 13.723 15 11.648c0-2.592-1.81-5.294-3.54-7.453C9.733 2.036 8.017.445 8.017.445L7.523 0Zm-.046 2.086c.39.37 1.412 1.295 2.812 3.047 1.646 2.06 3.211 4.684 3.211 6.515 0 1.676-.65 2.948-1.71 3.844-.259.217-.54.416-.845.586.185-.442.305-.923.305-1.43 0-4.687-2.508-7.546-2.508-7.546l-1.36-1.524.048 2.04s.003.954-.117 1.874c-.062.46-.147.917-.258 1.172-.033.073-.047.082-.07.117a1.653 1.653 0 0 1-.54-.375 3.908 3.908 0 0 1-.422-.515l-.726-1.125-.563 1.218s-.984 2.007-.984 4.664c0 .507.12.988.305 1.43a5.401 5.401 0 0 1-.844-.586C2.15 14.596 1.5 13.324 1.5 11.648c0-2.217 1.573-4.784 3.21-6.75C6.1 3.234 7.085 2.42 7.478 2.086Zm1.265 7.898a11.02 11.02 0 0 1 1.008 4.664 2.25 2.25 0 0 1-4.5 0c0-1.195.231-2.206.445-2.93.337.303.75.61 1.36.61.357 0 .697-.164.914-.375.217-.21.34-.46.445-.703.17-.396.258-.835.328-1.266Z"
    />
  </Svg>
)
const TimeSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} height={15}>
      <Circle cx={7.5} cy={7.5} r={7} stroke="#fff" />
      <Path stroke="#fff" strokeLinecap="round" d="M7.5 3v4.5H12" />
    </Svg>
)
const Container = styled.View`
    width: 100%;
    height: 100%;
    background: #1D2228;
`
const DivMix = styled.View`
    display: flex;
    flexDirection: column;
    gap: 4px;
    margin: 20px 12px;
    margin-bottom: 0;
`
const MainDivInfo = styled.View`
    display: flex;
    flexDirection: column;
    padding: 14px;
    height: 413px;
    border-radius: 35px;
    position: relative;
    background: #2A2E37;
`
const BottomDivInfo = styled.View`
    display: flex;
    flexDirection: column;
    padding: 20px;
    width: 50%;
    gap: 35px;
    border-radius: 35px;
    background: #2A2E37;
`
const SvgContainer = styled.View`
    background: red;
    position: absolute;
    top: 10px;
    left: 10px;
    height: 100px;
    z-index: 2;
`
const TrainImg = styled.Image`
    width: 100%;
    height: 70%;
    border-radius: 35px;
`
const BottoMenu = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 25px 40px;
    background: #2A2E37;
`

function PreStart() {
    const navigation = useNavigation();

    return (
        <Container>
            <DivMix>
                <MainDivInfo>
                    <TrainImg source={require('../../assets/image/yoga.png')}/>
                    <Text style={{
                        color: "#FFF",
                        marginTop: 20,
                        fontFamily: "Montserrat700",
                        fontSize: 32
                    }}>
                    QUICK AND DYNAMIC
                    </Text>
                </MainDivInfo>
                <View style={{display: 'flex',flexDirection: 'row',gap: "4px"}}>
                    <BottomDivInfo>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: "#FFF",
                                fontFamily: "Montserrat500",
                                fontSize: 14
                            }}>
                                Calories
                                </Text>
                            <KcalSvg/>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                        }}>
                            <Text style={{
                                color: "#FFF",
                                fontFamily: "Montserrat500",
                                fontSize: 50
                            }}>
                                156
                            </Text>
                            <Text style={{
                                color: "#FFF",
                                fontFamily: "Montserrat300",
                                fontSize: 16
                            }}>
                                KCAL
                            </Text>
                        </View>
                    </BottomDivInfo>

                    <BottomDivInfo>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: "#FFF",
                                fontFamily: "Montserrat500",
                                fontSize: 14
                            }}>
                                Training Time
                                </Text>
                            <TimeSvg/>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                        }}>
                            <Text style={{
                                color: "#FFF",
                                fontFamily: "Montserrat500",
                                fontSize: 50
                            }}>
                                40
                            </Text>
                            <Text style={{
                                color: "#FFF",
                                fontFamily: "Montserrat300",
                                fontSize: 16
                            }}>
                                MIN
                            </Text>
                        </View>
                    </BottomDivInfo>
                </View>
            </DivMix>
            <BottoMenu>
                <BackGoSvg onPress={()=>{navigation.goBack()}}/>
                <StartSvg onPress={()=>{navigation.navigate('TrainingNow')}}/>
                <LoveSvg/>
            </BottoMenu>
        </Container>
    )
}

export default PreStart