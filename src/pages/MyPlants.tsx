import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Image, FlatList, Alert} from 'react-native';
import { Header } from '../components/Header';
import { loadPlant, PlantPlops, removePlant } from '../libs/storage';
import colors from '../styles/colors';
import {formatDistance} from 'date-fns';
import {pt} from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants(){

  const [myPlants, setMyPlants]  = useState<PlantPlops[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>()

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
  }

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
    <View style={styles.container}>
      <Header />
      <View style={styles.sportLight}>
        <Image 
          source={require('../assets/waterdrop.png')} 
          style={styles.sportLightImage}
        />
        <Text style={styles.sportLightText}> {nextWaterd} </Text>
      </View>
      <View style={styles.plants} >
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  }, 

  sportLight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20, 
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  sportLightImage: {
    width: 60,
    height: 60
  },

  sportLightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    fontFamily: fonts.text
  },

  plants: {
    flex: 1,
    width: '100%',
  },

  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})