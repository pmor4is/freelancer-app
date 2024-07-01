import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encontre seu próximo trabalho freelance</Text>
      <Text style={styles.subtitle}>Conecte-se com empresas e freelancers talentosos</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ofertas')}>
          <Text style={styles.buttonText}>Visualizar Ofertas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('jobsCreate')}>
          <Text style={styles.buttonText}>Criar Oferta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3', // Azul vibrante para o título
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333', // Cinza escuro para o subtítulo
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#2196F3', // Azul vibrante para o botão
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});