import styled from 'styled-components/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background: ${colors.shape};
`;

export const PlantInfo = styled.View`
  flex: 1;
  padding: 50px 30px 50px 30px;
  align-items: center;
  justify-content: center;
  background: ${colors.shape};
`;

export const Controller = styled.View`
  background: ${colors.white};
  padding: 20px 20px 0 20px;
  padding-bottom: ${getBottomSpace() || 20}px;
`;

export const PlantName = styled.Text`
  font-family: ${fonts.heading};
  font-size: 24px;
  color: ${colors.heading};
  margin-top: 15px;
`;

export const PlantAbout = styled.Text`
  text-align: center;
  font-family: ${fonts.text};
  color: ${colors.heading};
  font-size: 17px;
  margin-top: 10px;
`;

export const TipContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${colors.blue_light};
  padding: 20px;
  border-radius: 20px;
  position: relative;
  bottom: 60px;
`;

export const TipImage = styled.Image`
  width: 56;
  height: 56;
`;

export const TipText = styled.Text`
  flex: 1;
  margin-left: 20px;
  font-family: ${fonts.text};
  color: ${colors.blue};
  font-size: 17px;
  text-align: justify;
`;

export const AlertLabel = styled.Text`
  text-align: center;
  font-family: ${fonts.complement};
  color: ${colors.heading};
  font-size: 12px;
  margin-bottom: 5px;
`;

export const DateTimePickerButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 40px 0 40px 0;
`;

export const DateTimePickerText = styled.Text`
  color: ${colors.heading};
  font-size: 24px;
  font-family: ${fonts.text};
`;