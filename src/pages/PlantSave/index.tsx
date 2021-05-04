import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core';
import {Alert, ScrollView, Platform} from 'react-native'
import DateTimePiker ,{Event} from '@react-native-community/datetimepicker'
import {SvgFromUri} from 'react-native-svg'
import { Button } from '../../components/Button'
import colors from '../../styles/colors';
import { format, isBefore } from 'date-fns';
import {PlantPlops, savePlant } from '../../libs/storage';
import {
  Container,
  PlantInfo,
  Controller,
  PlantName,
  PlantAbout,
  TipContainer,
  TipImage,
  TipText,
  AlertLabel,
  DateTimePickerButton,
  DateTimePickerText,
} from './styles';

interface Params {
  plant: PlantPlops;
}

export function PlantSave() {

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const navigation = useNavigation();

  function handlerChangeTime(event: Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState)
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏱');
    }

    if(dateTime)
      setSelectedDateTime(dateTime);

  }

  async function handleSave(){
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })
      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      })
    } catch (error) {
      Alert.alert('Não foi possível salvar. 😢');
    }
  }

  function handlerOpenDateTimePickerForAndroid(){
    setShowDatePicker(oldState => !oldState)
  }

  const route = useRoute();
  const { plant } = route.params as Params

  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape}}
    >
      <Container>
        <PlantInfo>
          <SvgFromUri
              uri={plant.photo}
              width={150}
              height={150}
          />
          <PlantName>{plant.name}</PlantName>
          <PlantAbout>{plant.about}</PlantAbout>
        </PlantInfo>
        <Controller>
          <TipContainer>
            <TipImage source={require('../assets/waterdrop.png')} />
            <TipText>{plant.water_tips}</TipText>
          </TipContainer>
          <AlertLabel>Ecolha o melhor horário para ser lembrado:</AlertLabel>
          {
            showDatePicker && (
                <DateTimePiker 
                  value={selectedDateTime}
                  mode="time"
                  display="spinner"
                  onChange={handlerChangeTime}
              />
            )
          }
          {Platform.OS === 'android' && (
            <DateTimePickerButton 
              onPress={handlerOpenDateTimePickerForAndroid}
            >
              <DateTimePickerText>{`Mudar ${format(selectedDateTime, 'HH:mm')}`}</DateTimePickerText>
            </DateTimePickerButton>
          )}
          <Button title='Cadastrar planta' onPress={handleSave}/>
        </Controller>
      </Container>
    </ScrollView>
  );
}