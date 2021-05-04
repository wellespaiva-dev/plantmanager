import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Button } from '../../components/Button';
import { 
  Container,
  Content,
  Emoji,
  Title,
  Subtitle,
  Footer
} from './styles'

interface Params {
  title: string;
  subTitle: string,
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

export function Confirmation(){

  const navigation = useNavigation();

  const routes = useRoute();

  const {
    title,
    subTitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as Params

  function handlerSubmmit(){
    navigation.navigate(nextScreen)
  }

  return(
    <Container>
      <Content>
        <Emoji>{emojis[icon]}</Emoji>
        <Title>{title}</Title>
        <Subtitle>{subTitle}</Subtitle>
        <Footer>
          <Button title={buttonTitle} onPress={handlerSubmmit} />
        </Footer>
      </Content>
    </Container>
  );
}