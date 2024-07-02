import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

import EventoPage from './src/pages/Eventos/EventosPage';
import Mapa from './src/pages/Mapa/Mapa';
import InformacoesPage from './src/pages/Informacoes/InformacoesPage';
import MaisInformacoes from './src/pages/MaisInformacoes/MaisInformacoes';

// Criação dos navegadores de pilha e de abas usando o React Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Definição do navegador de pilha para a navegação principal
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InformaçõesGerais" component={InformacoesPage} options={{ headerShown: false }} />
      <Stack.Screen name="MaisInformacoes" component={MaisInformacoes} options={{ title: 'Mais Informações' }}  />
    </Stack.Navigator>
  );
}

// Componente principal que configura a navegação usando abas
export default function App() {
  return (
    <NavigationContainer>
      {/* Navegador de abas */}
      <Tab.Navigator>
        <Tab.Screen 
        name="Eventos" 
        component={EventoPage} 
        options={{ headerShown: false, 
        tabBarIcon: ({color, size}) => <Feather name='star' color={color} size={size}
        />}}/>
        <Tab.Screen 
        name="Informações" 
        component={MainStack} 
        options={{ headerShown: false,
        tabBarIcon: ({color, size}) => <Feather name='book-open' color={color} size={size}
        />}}/>
        <Tab.Screen name="Mapa" 
        component={Mapa} 
        options={{ headerShown: false, 
        tabBarIcon: ({color, size}) => <Feather name='map-pin' color={color} size={size}
        />}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}