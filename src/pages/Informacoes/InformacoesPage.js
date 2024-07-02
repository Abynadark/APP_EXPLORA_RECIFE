import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import cinemasData from '../../json/cinemas.json';
import museusData from '../../json/museus.json';
import teatrosData from '../../json/teatros.json'; // Importe o JSON dos teatros

const InformacoesPage = () => {
  const [tipoExibicao, setTipoExibicao] = useState('todos'); // Estado para controlar o tipo de exibição (todos, cinemas, museus, teatros)
  const navigation = useNavigation(); // Hook de navegação do React Navigation
  const cinemas = cinemasData.cinemas; // Lista de cinemas do JSON importado
  const museus = museusData.museus; // Lista de museus do JSON importado
  const teatros = teatrosData.teatros; // Lista de teatros do JSON importado

  // Função para renderizar cada item na FlatList
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      {item.descricao && <Text>{item.descricao}</Text>}
  
      <TouchableOpacity
        style={styles.moreInfoButton}
        onPress={() => navigation.navigate('MaisInformacoes', { item })}
      >
        <Text style={styles.moreInfoText}>Mais Informações</Text>
      </TouchableOpacity>
    </View>
  );

  // Função para filtrar os dados com base no tipo de exibição selecionado
  const filtroData = () => {
    if (tipoExibicao === 'cinemas') {
      return cinemas.filter(item => !!item.nome);
    } else if (tipoExibicao === 'museus') {
      return museus.filter(item => !!item.nome);
    } else if (tipoExibicao === 'teatros') {
      return teatros.filter(item => !!item.nome);
    } else {
      return [...cinemas, ...museus, ...teatros].filter(item => !!item.nome);
    }
  };

  // Função para alternar o tipo de exibição com base no botão de filtro selecionado
  const toggleTipoExibicao = (tipo) => {
    setTipoExibicao(tipo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewVermelha} />
      <View style={styles.topoContainer}>
        <Text style={styles.informacaoText}>Informações</Text>
      </View>
      <View style={styles.filtroContainer}>
        <TouchableOpacity
          style={[styles.filtroButton, tipoExibicao === 'todos' && styles.filtroButtonActive]}
          onPress={() => toggleTipoExibicao('todos')}
        >
          <Text style={styles.filtroTexto}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroButton, tipoExibicao === 'cinemas' && styles.filtroButtonActive]}
          onPress={() => toggleTipoExibicao('cinemas')}
        >
          <Text style={styles.filtroTexto}>Cinemas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroButton, tipoExibicao === 'museus' && styles.filtroButtonActive]}
          onPress={() => toggleTipoExibicao('museus')}
        >
          <Text style={styles.filtroTexto}>Museus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroButton, tipoExibicao === 'teatros' && styles.filtroButtonActive]}
          onPress={() => toggleTipoExibicao('teatros')}
        >
          <Text style={styles.filtroTexto}>Teatros</Text>
        </TouchableOpacity>
      </View>
      
      {/* Lista de locais filtrados com base no tipo de exibição */}
      <FlatList
        data={filtroData()}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2AE00",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#DEE2E6',
    borderWidth: 1,
  },
  viewVermelha: { 
    width: "100%", 
    height: 35, 
    backgroundColor: "#A20000" 
  },
  topoContainer:{
    width: "100%", 
    backgroundColor: "#F4F4F4", 
    marginBottom: 20, 
    padding: 20 ,
  },
  informacaoText: {
    fontSize: 24,
    color: "#A20000", 
    fontWeight: "bold", 
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filtroButton: {

    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#2A6026',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  filtroButtonActive: {
    backgroundColor: '#1E2E62',
  },
  filtroTexto: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 10,
  },
  card: {
    marginBottom: 18,
    marginLeft: 10,
    width: "95%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreInfoButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1E2E62',
    borderRadius: 5,
  },
  moreInfoText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InformacoesPage;
