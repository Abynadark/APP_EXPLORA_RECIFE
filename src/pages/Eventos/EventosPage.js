import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Share, Linking  } from 'react-native';
import eventsData from './listadeeventos.json';

// Componente funcional EventItem que renderiza um item de evento
const EventItem = ({ event }) => {
   // Função para compartilhar detalhes do evento
  const onShare = async () => {
    try {
      await Share.share({
        message: `${event.title}\n\nData: ${event.date}\n\nHorário: ${event.time}\n\nLocal: ${event.location}\n\nEndereço: ${event.address}\n\nDescrição: ${event.description}\n\nMapa: ${event.mapsUrl}`
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // Função para abrir o Google Maps com o endereço do evento
  const openMaps = () => {
    if (event.mapsUrl) {
      Linking.openURL(event.mapsUrl);
    } else {
      console.warn('URL do Google Maps não definida para este evento.');
    }
  };

  return (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventTime}> às {event.time}</Text>
      </View>
      <Text style={styles.eventLocation}>{event.location}</Text>
      {/* Componente TouchableOpacity para tornar o endereço clicável */}
      <TouchableOpacity onPress={openMaps}>
        <Text style={styles.eventAddress}>{event.address}</Text>
      </TouchableOpacity>
      <Text style={styles.eventDescription}>{event.description}{event.location}</Text>

      <TouchableOpacity onPress={onShare} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente funcional EventoPage que renderiza a página de eventos
const EventoPage = () => {
  const [events, setEvents] = useState(eventsData);

  return (
    <View style={styles.container}>
      <View style={styles.boxVermelho}/>
      <View style={styles.boxTitle}>
        <Text style={styles.textTitle}>EXPLORA RECIFE</Text>
      </View>
      <View style={styles.eventos}>
        <View style={styles.boxEventos}>
          <Text style={styles.textEventos}>Eventos</Text>
        </View>
        
        <FlatList
          data={events}
          renderItem={({ item }) => <EventItem event={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },
  boxVermelho:{
    height: 35,
    backgroundColor: '#A20000',
  },
  boxTitle: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
    paddingTop: 30,
    paddingBottom: 30,
  },
  textTitle: {
    color: "#A20000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  boxEventos:{
    width: '100%',
    alignItems: "flex-start", 
    paddingLeft: 20, 
    marginTop: 20,
    marginBottom: 18,
  },
  textEventos: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
  },
  eventos: {
    backgroundColor: "#F4F4F4",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#DEE2E6',
    borderWidth: 1,
  },
  eventItem: {
    marginBottom: 18,
    marginLeft: 10,
    width: "95%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  eventTime: {
    fontSize: 14,
    color: '#888',
  },
  eventDescription: {
    marginTop: 5,
    fontSize: 16
  },
  eventLocation: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666'
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: '#0A13DB',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  eventAddress: {
    fontSize: 14,
    color: '#0A13DB',
    textDecorationLine: 'underline',
  },
  shareButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default EventoPage;
