import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const INTERESES = [
  'Programación',
  'Ilustración/diseño digital',
  'Diseño gráfico/UX/UI',
  'Escritura académica',
  'Gestión de proyectos',
  'Fotografía/video',
  'Diseño 3D/CAD',
  'Data Science',
  'Marketing digital',
];

const MESES = [
  { label: 'Enero', value: 'Enero' },
  { label: 'Febrero', value: 'Febrero' },
  { label: 'Marzo', value: 'Marzo' },
  { label: 'Abril', value: 'Abril' },
  { label: 'Mayo', value: 'Mayo' },
  { label: 'Junio', value: 'Junio' },
  { label: 'Julio', value: 'Julio' },
  { label: 'Agosto', value: 'Agosto' },
  { label: 'Septiembre', value: 'Septiembre' },
  { label: 'Octubre', value: 'Octubre' },
  { label: 'Noviembre', value: 'Noviembre' },
  { label: 'Diciembre', value: 'Diciembre' },
];

const GENDER = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
  { label: 'Otro', value: 'O' },
];

export default function RegisterScreen() {
  const nav = useNavigation();

  
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);

  
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleInterest = (item) => {
    setSelectedInterests((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };


  const DIAS = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert('Las contraseñas no coinciden.');
    }
    try {
      const resp = await fetch('https://front-app-dajj.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NombreDeUsuario: usuario,
          Contraseña: password,
          ConfirmarContraseña: confirmPassword,
          
          Día: selectedDay,
          Mes: selectedMonth,
          Género: selectedGender,
          Intereses: selectedInterests,
          
        }),
      });
      const json = await resp.json();
      if (json.status) {
        alert(json.message);
        nav.goBack();
      } else {
        alert(json.message);
      }
    } catch (e) {
      console.error(e);
      alert('Error al conectar al servidor.');
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrarse</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Nombre / Apellido */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1]}
            placeholder="Nombre"
            placeholderTextColor="#888"
          />
          <TextInput
            style={[styles.input, styles.flex1]}
            placeholder="Apellido"
            placeholderTextColor="#888"
          />
        </View>

        {/* Usuario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#888"
          value={usuario}
          onChangeText={setUsuario}
        />

        {/* Contraseña */}
        <View style={styles.input}>
          <TextInput
            secureTextEntry={!showPwd}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
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

        {/* Confirmar contraseña */}
        <View style={styles.input}>
          <TextInput
            secureTextEntry={!showConfirmPwd}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#888"
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPwd((v) => !v)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showConfirmPwd ? 'eye' : 'eye-off'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Fecha de nacimiento */}
        <View style={styles.row}>
          <View style={[styles.wrapper, styles.flex1]}>
            <Text style={styles.pickerLabel}>Día</Text>
            <RNPickerSelect
              onValueChange={setSelectedDay}
              items={DIAS}
              placeholder={{ label: 'Día', value: '' }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              value={selectedDay}
            />
          </View>
          <View style={[styles.wrapper, styles.flex1]}>
            <Text style={styles.pickerLabel}>Mes</Text>
            <RNPickerSelect
              onValueChange={setSelectedMonth}
              items={MESES}
              placeholder={{ label: 'Mes', value: '' }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              value={selectedMonth}
            />
          </View>
        </View>

        {/* Género */}
        <View style={styles.wrapper}>
          <Text style={styles.pickerLabel}>Género</Text>
          <RNPickerSelect
            onValueChange={setSelectedGender}
            items={GENDER}
            placeholder={{ label: 'Seleccionar', value: '' }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            value={selectedGender}
          />
        </View>

        {/* Intereses */}
        <Text style={styles.sectionTitle}>Intereses</Text>
        <View style={styles.interestsContainer}>
          {INTERESES.map((item) => {
            const sel = selectedInterests.includes(item);
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.interestButton,
                  sel && styles.interestButtonSelected,
                ]}
                onPress={() => toggleInterest(item)}
              >
                <Text
                  style={[
                    styles.interestText,
                    sel && styles.interestTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botón Confirmar */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Confirmar</Text>
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
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 10,
  },
  flex1: { flex: 1 },
  input: {
    position: 'relative',
    backgroundColor: '#1E1C2C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginVertical: 6,
    color: '#FFF',
  },
  passwordInput: {
    color: '#FFF',
    paddingRight: 36,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },
  wrapper: {
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#1E1C2C',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'android' ? 4 : 12,
  },
  pickerLabel: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  interestButton: {
    borderWidth: 1,
    borderColor: '#3E3160',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  interestButtonSelected: {
    backgroundColor: '#3E3160',
  },
  interestText: {
    fontSize: 14,
    color: '#FFF',
  },
  interestTextSelected: {
    color: '#FFF',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#7B61FF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 0,
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: '#888',
  },
});