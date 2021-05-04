import styled from 'styled-components/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: space-around;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 100%;
`;

export const Emoji = styled.Text`
  font-size: 78px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${fonts.heading};
  color: ${colors.heading};
  text-align: center;
  line-height: 38px;
  margin-top: 15px;
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.text};
  text-align: center;
  font-size: 17px;
  padding: 10px 0 10px 0;
  color: ${colors.heading};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 0 50px 0 50px;
  margin-top: 20px;
`;