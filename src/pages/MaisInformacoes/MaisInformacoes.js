import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';


const MaisInformacoes = ({ route }) => {
  const { item } = route.params; // Obtém o parâmetro 'item' passado pela navegação

  // Função para lidar com o pressionamento do número de telefone
  const handleTelefonePress = (numero) => {
    Linking.openURL(`tel:${numero}`);
  };

  // Função para lidar com o pressionamento do número de WhatsApp
  const handleWhatsAppPress = (numero) => {
    Linking.openURL(`whatsapp://send?phone=${numero}`);
  };

  // Função para lidar com o pressionamento do endereço de email
  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  //No return, ele verifica se tem campos vazios ou do tipo array e faz também a estruturação de conteúdo para ser exibido
  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.nome}</Text>
          {item.descricao ? <Text style={styles.descricao}>{item.descricao}</Text> : null}
          {item.endereco ? (
            <>
              <Text style={styles.subtitle}>Endereço:</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
            </>
          ) : null}
          {item.telefone ? (
            <>
              <Text style={styles.subtitle}>Telefone:</Text>
              {Array.isArray(item.telefone) ? (
                item.telefone.map((tel, idx) => (
                  <TouchableOpacity key={idx} onPress={() => handleTelefonePress(tel)}>
                    <Text style={styles.telefone}>{tel}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity onPress={() => handleTelefonePress(item.telefone)}>
                  <Text style={styles.telefone}>{item.telefone}</Text>
                </TouchableOpacity>
              )}
            </>
          ) : null}
          {item.whatsapp ? (
            <>
              <Text style={styles.subtitle}>WhatsApp:</Text>
              <TouchableOpacity onPress={() => handleWhatsAppPress(item.whatsapp)}>
                <Text style={styles.whatsapp}>{item.whatsapp}</Text>
              </TouchableOpacity>
            </>
          ) : null}
          {item.email ? (
            <>
              <Text style={styles.subtitle}>Email:</Text>
              {Array.isArray(item.email) ? (
                item.email.map((email, idx) => (
                  <TouchableOpacity key={idx} onPress={() => handleEmailPress(email)}>
                    <Text style={styles.email}>{email}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity onPress={() => handleEmailPress(item.email)}>
                  <Text style={styles.email}>{item.email}</Text>
                </TouchableOpacity>
              )}
            </>
          ) : null}
          {item.site ? (
            <>
              <Text style={styles.subtitle}>Site:</Text>
              <Text style={styles.site} onPress={() => Linking.openURL(item.site)}>
                {item.site}
              </Text>
            </>
          ) : null}
          {item.instagram ? (
            <>
              <Text style={styles.subtitle}>Instagram:</Text>
              <Text style={styles.instagram} onPress={() => Linking.openURL(item.instagram)}>
                {item.instagram}
              </Text>
            </>
          ) : null}
          {item.funcionamento ? (
            <>
              <Text style={styles.subtitle}>Funcionamento:</Text>
              <Text style={styles.funcionamento}>{item.funcionamento}</Text>
            </>
          ) : null}
          {item.valoringresso ? (
            <>
              <Text style={styles.subtitle}>Valor do Ingresso:</Text>
              <Text style={styles.valoringresso}>{item.valoringresso}</Text>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#2A6026',
    alignItems: 'center', // Centraliza horizontalmente
  },
  scrollViewContainer: {
    paddingVertical: 15,
    paddingLeft: 5,
  },
  container: {
    width: '98%',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  endereco: {
    fontSize: 16,
    marginBottom: 10,
  },
  telefone: {
    fontSize: 16,
    color: '#D2AE00',
    marginTop: 5,
  },
  whatsapp: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  email: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  },
  site: {
    fontSize: 16,
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  instagram: {
    fontSize: 16,
    color: 'purple',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  funcionamento: {
    marginTop: 5,
    fontSize: 16,
  },
  valoringresso: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default MaisInformacoes;
