import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from "@react-navigation/native";
import Svg, { Rect, Path } from "react-native-svg"
import { BlurView } from 'expo-blur';
import MainScreen from '../../screens/Main';

const Buttonn = styled.TouchableOpacity`
    width: fit-content;
    height: fit-content;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 13px;
    background-color: transparent;
`;
const AvatarCircle = ({color}) => (
    <View
        style={{
            width:23,
            height: 23
        }}
    >
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
            <Rect width={10} height={10} fill={color} rx={3} />
            <Rect width={10} height={10} x={12} fill={color} rx={3} />
            <Rect width={10} height={10} x={12} y={12} fill={color} rx={3} />
            <Rect width={10} height={10} y={12} fill={color} rx={3} />
        </Svg>
    </View>
);
const NotificationIcon = () => (
    <View
        style={{
            width:23,
            height: 23
        }}
    >
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
            <Path fill="#A4A4A4" d="M18 12c1.105 0 2.02.904 1.8 1.987A10.002 10.002 0 0 1 2.93 19.07 10 10 0 0 1 8.013 2.2C9.096 1.98 10 2.895 10 4v6a2 2 0 0 0 2 2h6Z"/>
            <Path fill="#A4A4A4" d="M12 2c0-1.105.904-2.02 1.987-1.8A9.999 9.999 0 0 1 21.8 8.012C22.02 9.096 21.105 10 20 10h-6a2 2 0 0 1-2-2V2Z"/>
        </Svg>
    </View>
);
const ChatIcon = () => (
    <View
        style={{
            width:23,
            height: 23
        }}
    >
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      fill="#A6A6A6"
      fillRule="evenodd"
      d="M3 0a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3Zm3 5a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2H6Zm-1 6a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1Zm1 3a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H6Z"
      clipRule="evenodd"
    />
  </Svg>
    </View>
);
const SettingsIcon = ({color}) => (
    <View
        style={{
            width:23,
            height: 23
        }}
    >
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
        <Path
            fill={color}
            fillRule="evenodd"
            d="M19.003 4.902C18.183 3.674 16.323 4 14.847 4a3 3 0 0 1-3-3c0-.436-.258-.872-.691-.923a11.112 11.112 0 0 0-2.619 0c-.432.051-.69.487-.69.923a3 3 0 0 1-3 3C3.37 4 1.51 3.674.69 4.902a11.05 11.05 0 0 0-.142.219c-.903 1.425.484 3.22 1.096 4.792.13.337.203.704.203 1.087 0 .633-.196 1.22-.53 1.704-.75 1.084-1.75 2.435-1.115 3.59.736 1.337 2.818.877 4.337.722A3 3 0 0 1 7.847 20c0 .872.39 1.918 1.26 1.976a11.157 11.157 0 0 0 1.478 0c.87-.058 1.262-1.104 1.262-1.976a3 3 0 0 1 3.308-2.984c1.519.155 3.6.616 4.336-.722.635-1.155-.365-2.506-1.114-3.59a2.986 2.986 0 0 1-.53-1.704c0-.383.072-.75.202-1.087.612-1.572 2-3.367 1.096-4.792a10.94 10.94 0 0 0-.142-.219ZM9.847 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            clipRule="evenodd"
        />
    </Svg>
    </View>
)

function Nav ({routeName}){
    const navigation = useNavigation();

    return (
        <BlurView intensity={59} tint="dark" style={styles.blurContainer}>
            <Buttonn onPress={() => navigation.navigate('Main')}>
                <AvatarCircle color={routeName=="Main" ? '#E2FF14' : '#B7B3B4'}/>
            </Buttonn>
            <Buttonn onPress={() => {}}>
                <NotificationIcon/>
            </Buttonn>
            <Buttonn onPress={() => {}}>
                <ChatIcon/>
            </Buttonn>
            <Buttonn onPress={() => {navigation.navigate('Profile')}}>
                <SettingsIcon color={routeName=="Profile" ? '#E2FF14' : '#B7B3B4'} />
            </Buttonn>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        width: "100%",
        height: "fit-content",
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 35,
        paddingRight: 35,
        margin: 0
    }
}); 
export default Nav;