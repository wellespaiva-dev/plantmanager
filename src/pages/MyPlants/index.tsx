import React, { useEffect, useState } from 'react';
import {Alert} from 'react-native';
import { Header } from '../../components/Header';
import { loadPlant, PlantPlops, removePlant } from '../../libs/storage';
import {formatDistance} from 'date-fns'
import {pt} from 'date-fns/locale'
import { PlantCardSecondary } from '../../components/PlantCardSecondary';
import { Load } from '../../components/Load';
import {
  Container,
  SportLight,
  SportLightImage,
  SportLightText,
  Plants,
  PlantsTitle,
} from './styles'
import { FlatList } from 'react-native';

export function MyPlants(){

  const [myPlants, setMyPlants]  = useState<PlantPlops[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  function handleRemove(Plant: PlantPlops){
    Alert.alert('Remover', `Deseja remover a ${Plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {

            await removePlant(Plant.id);

            setMyPlants((oldData) => 
              oldData.filter((item) => item.id !== Plant.id)
            );

          } catch (error) {
            Alert.alert('Não foi possível remover! 😢')
          }
        }
      }
    ])
  };

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale : pt}
      );

      setNextWaterd(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
      )

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, [])

  if(loading)
    return <Load />

  return(
    <Container>
      <Header />
      <SportLight>
        <SportLightImage source={require('../assets/waterdrop.png')} />
        <SportLightText>{nextWaterd}</SportLightText>
      </SportLight>
      <Plants>
        <PlantsTitle>Próximas regadas</PlantsTitle>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => {handleRemove(item)}}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
        />
      </Plants>
    </Container>
  );

}