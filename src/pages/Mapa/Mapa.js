import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';
import museus from '../../../src/json/museus.json'; // Importe o JSON dos museus
import cinemas from  '../../../src/json/cinemas.json'; // Importe o JSON dos cinemas
import teatros from '../../../src/json/teatros.json'; // Importe o JSON dos teatros

export default function Mapa() {
  const [localizacao, setLocalizacao] = useState(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const mapRef = useRef(null);

  async function requestLocationPermissions() {
     // Solicita permissões de localização ao usuário
    const { granted } = await requestForegroundPermissionsAsync();

    // Atualiza o estado de permissão concedida
    setLocationPermissionGranted(granted);

    // Se as permissões forem concedidas, obtém a posição atual
    if (granted) {

      // Obtém a posição geográfica atual do dispositivo
      const currentPosition = await getCurrentPositionAsync();

      // Atualiza o estado localizacao com a posição obtid
      setLocalizacao(currentPosition);

      // Exibe a posição atual no console para fins de depuração
      console.log("LOCALIZAÇÃO ATUAL =>", currentPosition);
    }
  }

  // Chama a função para solicitar permissões de localização assim que o componente é montado
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (locationPermissionGranted) {
      const subscription = watchPositionAsync({
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      }, (response) => {
        console.log("Nova Localização => ", response);
        setLocalizacao(response);
        mapRef.current?.animateCamera({
          center: response.coords
        });
      });

      return () => {
        subscription && subscription.remove();
      };
    }
  }, [locationPermissionGranted]);

  return (
    <View style={styles.container}>
      <View style={styles.topoContainer}>
        <Text style={styles.mapaText}>Mapa</Text>
      </View>
      {/* Componente MapView para exibir o mapa */}
      <MapView
        ref={mapRef}
        style={styles.map}

         // Configuração inicial da região do mapa
        initialRegion={{
          latitude: localizacao?.coords.latitude || -8.047562,
          longitude: localizacao?.coords.longitude || -34.876964,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marcador da localização atual */}
        {localizacao && (
          <Marker
            coordinate={{
              latitude: localizacao.coords.latitude,
              longitude: localizacao.coords.longitude,
            }}
            title="Minha Localização"
            description="Você está aqui!"
            pinColor="red"
          />
        )}
        {/* Marcadores dos museus */}
        {museus.museus.map((museu, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: museu.latitude,
              longitude: museu.longitude,
            }}
            title={museu.nome}
            description={museu.descricao}
            pinColor="orange"
          />
        ))}
        {/* Marcadores dos cinemas */}
        {cinemas.cinemas.map((cinema, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: cinema.latitude,
              longitude: cinema.longitude,
            }}
            title={cinema.nome}
            description={cinema.descricao}
            pinColor="blue"
          />
        ))}
        {/* Marcadores dos teatros */}
        {teatros.teatros.map((teatro, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: teatro.latitude,
              longitude: teatro.longitude,
            }}
            title={teatro.nome}
            description={teatro.descricao}
            pinColor="green"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2E62",
    alignItems: 'center',
    justifyContent: 'center',
  },
  topoContainer: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    marginTop: 30,
    padding: 20,
  },
  mapaText: {
    fontSize: 24,
    color: "#1E2E62",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
