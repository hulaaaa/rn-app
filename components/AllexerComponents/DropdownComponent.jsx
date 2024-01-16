import React, { useState } from 'react';
import { StyleSheet, Text, Alert,Modal, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import styled from 'styled-components';
import Svg, { Path } from "react-native-svg"

const SelectSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={14} height={8}>
      <Path
        fill="#FEFFFF"
        fillOpacity={0.8}
        d="M5.648 5.652a.5.5 0 0 0 .704 0L11.198.855A.5.5 0 0 0 10.846 0H1.154a.5.5 0 0 0-.352.855l4.846 4.797Z"
      />
    </Svg>
)

const AdvancedText = styled.Text`
    color: #E0FE10;
    font-family: Montserrat700;
    font-size: 27px;
`

const DropdownComponent = ({onSelect}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const options = ['Beginner', 'Middle', 'Advanced'];
    const [selectedOption, setSelectedOption] = useState("Select");

    const handleSelect = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);
        onSelect(option)
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setDropdownVisible(true)}>
                <View style={styles.textContainer}>
                    <AdvancedText>{selectedOption}</AdvancedText>
                    <SelectSvg/>
                </View>
            </TouchableOpacity>

            {dropdownVisible && (
                <View style={styles.dropdownContainer}>
                {
                  options.map((option, index) => (
                    <TouchableOpacity
                    key={index}
                    onPress={() => handleSelect(option)}
                    style={styles.option}
                    >
                    <Text style={{color: "white"}}>{option}</Text>
                    </TouchableOpacity>
                  ))
                }
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    gap: "10px"
  },
  dropdownContainer: {
    zIndex: 1,
    left: 0,
    right: 0,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#2A2E37',
  },
  option: {
    padding: 10,
  },
});

export default DropdownComponent;