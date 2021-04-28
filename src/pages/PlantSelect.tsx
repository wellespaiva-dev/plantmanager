import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { EnvorimentButton } from '../components/EnvorimentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantPlops } from '../libs/storage';
import api  from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvorimentProps{
  key: string,
  title: string
}

export function PlantSelect(){

  const [envoriment, setEnvoriment] = useState<EnvorimentProps[]>([]);
  const [plants, setPlants] = useState<PlantPlops[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantPlops[]>(plants)
  const [envorimentSelected, setEnvorimentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation()

  function handlerEnvorimentSelected(envoriment: string){
    setEnvorimentSelected(envoriment);

    if(envoriment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant => 
      plant.environments.includes(envoriment)
    )

    setFilteredPlants(filtered);
  }

  function handlerFetchMore(distance: number){
    if(distance < 1)
      return;
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function fetchEnvoriment(){
    api.get('plants_environments?_sort=title&_order=asc').then(resp => {
      setEnvoriment([
        {
          key: 'all',
          title: 'Todos'
        }
        ,...resp.data
      ])
    }).catch((resp) => console.log('Error: '+resp))
  }

  function fetchPlants(){
    api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`).then(resp => {
      if(!resp.data)
        return setLoading(true);
      if(page > 1){
        setPlants(oldValue => [...oldValue, ...resp.data]);
        setFilteredPlants(oldValue => [...oldValue, ...resp.data]);
      }else{
        setPlants(resp.data)
        setFilteredPlants(resp.data);
      }
      setLoading(false);
      setLoadingMore(false);
    }).catch((resp) => console.log('Error: '+resp))
  }

  function handlerPlantSelect(plant: PlantPlops){
    navigation.navigate('PlantSave', {plant})
  }

  useEffect(() => {
    fetchEnvoriment();
    fetchPlants();
  }, [])

  
  if(loading)
    return <Load />
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual hambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={envoriment}
          keyExtractor={(item) => String(item.key)}
          renderItem={({item}) => (
            <EnvorimentButton 
              title={item.title}
              active={item.key === envorimentSelected}
              onPress={() => handlerEnvorimentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.envorimentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardPrimary 
              data={item}
              onPress={()=> handlerPlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => {
            handlerFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={
            loadingMore ?
            <ActivityIndicator color={colors.green} />
            : <></>
          }
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 20,
  },

  envorimentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})