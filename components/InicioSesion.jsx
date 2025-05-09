
import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function InicioSesion() {
  const [showPwd, setShowPwd] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Título */}
        <Text style={styles.title}>Iniciar sesión</Text>

        {/* Logo */}
        <Image
          source={require('../assets/images/LogoIdea2sinletras (1).png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Usuario / Email */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Usuario/Email</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Usuario/Email"
            placeholderTextColor="#888"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Contraseña */}
        <View style={[styles.inputWrapper, { marginTop: 16 }]}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.input}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry={!showPwd}
              style={styles.textInputInside}
            />
            <TouchableOpacity
              onPress={() => setShowPwd((v) => !v)}
              style={styles.eyeIcon}
            >
              <Feather
                name={showPwd ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Olvidaste contraseña */}
        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Botones de inicio */}
        <Link href="/home" asChild>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Iniciar sesión con Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Iniciar sesión con Apple</Text>
        </TouchableOpacity>

        {/* Problemas */}
        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>¿Problemas al iniciar sesión?</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#170F24',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  logo: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  inputWrapper: {
    width: '100%',
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    position: 'relative',
    backgroundColor: '#1E1C2C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFF',
  },
  textInputInside: {
    color: '#FFF',
    flex: 1,
    paddingRight: 36,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },
  forgotWrapper: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: '#888',
    fontSize: 13,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#7B61FF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialButton: {
    width: '100%',
    backgroundColor: '#3E3160',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  socialButtonText: {
    color: '#FFF',
    fontSize: 15,
  },
});