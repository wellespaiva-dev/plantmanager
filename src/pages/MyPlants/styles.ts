import styled from "styled-components/native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 50px 30px 0 30px;
  background: ${colors.background};
`;

export const SportLight = styled.View`
  background: ${colors.blue_light};
  padding: 0 20px 0 20px;
  border-radius: 20px;
  height: 110px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SportLightImage = styled.Image`
  width: 60px;
  height: 60px;
`;

export const SportLightText = styled.Text`
  flex: 1;
  color: ${colors.blue};
  padding: 0 20px 0 20px;
  font-family: ${fonts.text};
`;

export const Plants = styled.View`
  flex: 1;
  width: 100%;
`;

export const PlantsTitle = styled.Text`
  font-size: 24px;
  font-family: ${fonts.heading};
  color: ${colors.heading};
  margin-top: 20;
  margin-bottom: 20;
`;