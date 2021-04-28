import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UseIdentification } from '../pages/UseIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';
import AuthRoute from './tab.routes';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <Stack.Screen name='Welcome' component={Welcome}/>
    <Stack.Screen name='UseIdentification' component={UseIdentification}/>
    <Stack.Screen name='Confirmation' component={Confirmation}/>
    <Stack.Screen name='PlantSelect' component={AuthRoute} />
    <Stack.Screen name='PlantSave' component={PlantSave} />
    <Stack.Screen name='MyPlants' component={AuthRoute} />
  </Stack.Navigator>
)

export default AppRoutes;