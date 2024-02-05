import { useState, useEffect } from 'react';
import { Text, View, ScrollView} from 'react-native';
import styled from 'styled-components';
import { supabase } from '../../lib/supabase';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  flex: 1;
  margin-top: 0px;
`;

const TextiAct = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  padding: 0;
  margin: 0;
  padding-top: 30px;
  margin-bottom: 110px;
`;

const ActiveDiv = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #2A2E37;
  padding: 20px;
  border-radius: 17px;
`;

function LastActiv({ id }) {
  const [latestActivities, setLatestActivities] = useState([]);

  useEffect(() => {
    async function fetchLatestActivities() {
      try {
        const { data: latestActivitiesData, error: latestActivitiesError } = await supabase
          .from('services_latesttraining')
          .select('training_date, training_time, exercise_id')
          .eq('user_id', id)
          .order('training_date', { ascending: false });

        if (latestActivitiesError) {
          console.error('Error fetching latest activities:', latestActivitiesError.message);
          return;
        }

        const enrichedActivities = await Promise.all(
          latestActivitiesData.map(async (activity) => {
            const { data: exerciseData, error: exerciseError } = await supabase
              .from('services_exercises')
              .select('exercise_title')
              .eq('id', activity.exercise_id)
              .single();

            if (exerciseError) {
              console.error('Error fetching exercise details:', exerciseError.message);
              return null;
            }

            return {
              ...activity,
              exercise_title: exerciseData ? exerciseData.exercise_title : 'Unknown Exercise',
            };
          })
        );

        setLatestActivities(enrichedActivities.filter(Boolean));
      } catch (error) {
        console.error('Error fetching latest activities:', error.message);
      }
    }

    fetchLatestActivities();
  }, [id]);

  return (
    <Container>
      <TextiAct>
        <Text
          style={{
            fontSize: 17,
            fontFamily: 'Montserrat700',
            color: '#FEFFFF',
          }}
        >
          LATEST ACTIVITIES
        </Text>
        {latestActivities.map((item, index) => (
          <ActiveDiv key={index}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Montserrat500',
                  color: '#F0F0F0',
                }}
              >
                {item.training_date}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Montserrat700',
                color: '#E0FE10',
              }}
            >
              {item.exercise_title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Montserrat500',
                color: '#F0F0F0',
              }}
            >
              {item.training_time} MIN
            </Text>
          </ActiveDiv>
        ))}
      </TextiAct>
    </Container>
  );
}

export default LastActiv;
