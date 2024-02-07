import {Alert, Text, View} from "react-native";
import styled from "styled-components";
import {RFValue} from "react-native-responsive-fontsize";
import {useEffect, useState} from "react";
import {supabase} from "../../lib/supabase";

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: auto;
  border-radius: 17px;
  background: #2a2e37;
  margin-top: 1.5%;
`;
const TextDiv = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const DiagramDiv = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const ColumnDiagramDiv = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function TrainingStat({session}) {
    const [dataTrain, setDataTrain] = useState([]);

    async function getProfile() {
        try {
            if (!session?.user) throw new Error("No user on the session!");
            const today = new Date();
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);
            const todayFormatted = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
            const sevenDaysAgoFormatted = `${sevenDaysAgo.getDate()}/${sevenDaysAgo.getMonth() + 1}/${sevenDaysAgo.getFullYear()}`;
            const {data: trainingsData, error: trainingsError} = await supabase
                .from("services_latesttraining")
                .select(`id, training_date`)
                .eq("user_id", session?.user.id)
                .gte('training_date', sevenDaysAgoFormatted)
                .lte('training_date', todayFormatted);
            if (trainingsError) {
                throw trainingsError;
            }

            const updatedDataTrain = trainingsData.map(item => ({
                id: item.id,
                date: item.training_date,
            }));

            console.log("Training Data:", updatedDataTrain);

            setDataTrain(updatedDataTrain);
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        }
    }

    useEffect(() => {
        getProfile();
    }, [session]);
    return (
        <Container>
            <TextDiv>
                <View style={{gap: 5}}>
                    <Text
                        style={{
                            fontFamily: "Montserrat700",
                            color: "#A5A8AD",
                            fontSize: RFValue(17),
                        }}
                    >
                        WEEKLY TOTAL
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Montserrat300",
                            color: "#A5A8AD",
                            fontSize: RFValue(12)
                        }}>
                        Trainings
                    </Text>
                </View>

                <Text
                    style={{
                        fontFamily: "Montserrat700",
                        color: "white",
                        fontSize: RFValue(25),
                    }}
                >
                    {dataTrain.length}

                </Text>
            </TextDiv>
        </Container>
    );
}

export default TrainingStat;
