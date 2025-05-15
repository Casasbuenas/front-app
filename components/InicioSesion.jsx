
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = Math.min(width * 0.9, 320);

export default function LoginScreen() {
  const nav = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const resp = await fetch('https://backend-app-huge.onrender.com/iniciosesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NombreDeUsuario: username,
          Contraseña: password,
        }),
      });
      const json = await resp.json();
      if (json.status) {
        await AsyncStorage.setItem('user', JSON.stringify(json.data));
        nav.replace('home', { user: json.data });
      } else {
        alert(json.message);
      }
    } catch (e) {
      console.error(e);
      alert('Error al conectar al servidor.');
    }
  };

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

      {/* Usuario */}
      <TextInput
        placeholder="Nombre de usuario"
        placeholderTextColor="#888"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      {/* Contraseña */}
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón Iniciar Sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Link a Registro */}
      <TouchableOpacity onPress={() => nav.navigate('register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
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
  input: {
    width: BUTTON_WIDTH,
    backgroundColor: '#1E1C2C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFF',
    marginVertical: 6,
  },
  button: {
    width: BUTTON_WIDTH,
    paddingVertical: 12,
    backgroundColor: '#38275F',
    borderRadius: 9999,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  link: {
    color: '#7B61FF',
    marginTop: 16,
  },
});
