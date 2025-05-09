
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import Boton from './Boton';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = Math.min(width * 0.9, 320);

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/LogoIdea2sinletras (1).png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>LinkUp</Text>
      <Text style={styles.description}>
        Bienvenidos a nuestra app. Aquí podrás crear proyectos de estudio y entrar a proyectos por medio de match.
      </Text>

      {/* Iniciar sesión (sin Link) */}
      <Link href="/iniciosesion" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </Link>
      

      {/* Crear Cuenta con navegación */}
      <Link href="/register" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#170F24',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 192,
    height: 192,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  description: {
    maxWidth: 384,
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    width: BUTTON_WIDTH,
    paddingVertical: 12,
    backgroundColor: '#38275F',
    borderRadius: 9999,
    alignItems: 'center',
    marginBottom:20
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  mb: {
    marginBottom: 16,
  },
});



