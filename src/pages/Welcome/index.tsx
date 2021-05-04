import React from 'react'
import wateringImg from '../assets/watering.png'
import colors from '../../styles/colors'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import {
  Container,
  Wrapper, 
  Title,
  SubTitle,
  Image,
  Button,
} from './styles';

export function Welcome(){

  const navigation = useNavigation();

  function handlerStart(){
    navigation.navigate('UseIdentification')
  }

  return(
    <Container>
      <Wrapper>
        <Title>Gerencie {'\n'} suas plantas de {'\n'} forma fácil</Title>
        <Image 
          source={wateringImg}
          resizeMode='contain'
        />
        <SubTitle>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.</SubTitle>
        <Button
          activeOpacity={0.6}
          onPress={handlerStart}
        >
          <Feather 
            name="chevron-right" 
            style={{
              color: colors.white,
              fontSize: 32
            }}
          />
        </Button>
      </Wrapper>
    </Container>
  );

}