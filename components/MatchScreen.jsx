// src/screens/MatchScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  ImageBackground,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ← Aquí ya NO necesitamos Link de expo-router
// import { Link } from 'expo-router';

// ← AQUÍ: siguen tus imports de icons/images
import bellIcon from '../assets/images/bellIcon.png';
import homeIcon from '../assets/images/home.png';
import matchIcon from '../assets/images/Match.png';
import plusIcon from '../assets/images/plus.png';
import notifIcon from '../assets/images/notif.png';
import profileIcon from '../assets/images/profile.png';
import xIcon from '../assets/images/xIcon.png';
import matchFull from '../assets/images/MatchFull.png';
import homeVacio from '../assets/images/HomeVacio.png';

const DATA = [
  {
    id: '1',
    name: 'Proyecto Arduino IoT',
    location: 'Tecnología',
    roles: 'Ingeniero Electrónico, Desarrollador Firmware',
    description:
      'Buscamos intercambiar conocimientos para montar una red de sensores IoT sobre Arduino Mega. El objetivo es aprender diseño de PCB, comunicación MQTT y creación de dashboards Web.',
    image: require('../assets/images/ArduinoImagen.jpeg'),
  },
  {
    id: '2',
    name: 'App React Native',
    location: 'Desarrollo Móvil',
    roles: 'Desarrollador Frontend, UX/UI Designer',
    description:
      'Proyecto de intercambio donde construiremos una app para unir a estudiantes con mentores. Cubriremos navegación, animaciones y conexión a Firebase.',
    image: require('../assets/images/DesarrolloMovil.jpeg'),
  },
  {
    id: '3',
    name: 'Data Science con Python',
    location: 'Ciencia de Datos',
    roles: 'Analista de Datos, Machine Learning Engineer',
    description:
      'Creación colaborativa de un pipeline de análisis de datos abiertos. Aprenderás pandas avanzado, visualización con matplotlib y modelos de regresión lineal.',
    image: require('../assets/images/CienciaDatos.jpeg'),
  },
  {
    id: '4',
    name: 'Game Jam Unity',
    location: 'Desarrollo de Juegos',
    roles: 'Programador C#, Artista 2D',
    description:
      'Únete a un Game Jam de 48h para crear un minijuego. Compartiremos técnicas de optimización, físicas y animaciones 2D en Unity.',
    image: require('../assets/images/DesarrolloJuegos.jpeg'),
  },
];

export default function MatchScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const current = DATA[index];

  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    setMatched(false);
  }, [index]);

  const nextCard = () =>
    setIndex(i => (i + 1 < DATA.length ? i + 1 : 0));

  const handleReject = () => {
    Animated.timing(pan, {
      toValue: { x: -CARD_W, y: 0 },
      duration: 200,
      useNativeDriver: true,
    }).start(nextCard);
  };

  const handleAccept = () => {
    Animated.timing(pan, {
      toValue: { x: CARD_W, y: 0 },
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMatched(true);
    });
  };

  // *** Aquí cambiamos goToProject ***
  const goToProject = () => {
    // Navega pasándole TODO el objeto `current` como `project`
    navigation.navigate('project', { project: current });
    // Después avanzas la tarjeta
    setMatched(false);
    nextCard();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, { dx }) => {
        const threshold = CARD_W * 0.25;
        if (dx > threshold) handleAccept();
        else if (dx < -threshold) handleReject();
        else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-CARD_W / 2, 0, CARD_W / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Match</Text>
        <TouchableOpacity>
          <Image source={bellIcon} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['Recent', 'Nearby', 'Popular'].map((t, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.tab, i === 0 && styles.tabActive]}
          >
            <Text
              style={[styles.tabText, i === 0 && styles.tabTextActive]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Card */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { rotate },
            ],
          },
        ]}
      >
        <ImageBackground
          source={current.image}
          style={styles.cardImage}
        >
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{current.name}</Text>
            <Text style={styles.cardCategory}>{current.location}</Text>
            <Text style={styles.cardLabel}>Roles:</Text>
            <Text style={styles.cardText}>{current.roles}</Text>
            <Text style={styles.cardLabel}>Descripción:</Text>
            <Text style={styles.cardText}>{current.description}</Text>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Overlay de Match */}
      {matched && (
        <View style={styles.matchOverlay}>
          <Text style={styles.matchText}>¡Es un match!</Text>
          <TouchableOpacity
            style={styles.matchButton}
            onPress={goToProject}  // ← aquí llamamos a la nueva función
          >
            <Text style={styles.matchButtonText}>Ir al proyecto</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botones manuales */}
      {!matched && (
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnReject]}
            onPress={handleReject}
          >
            <Image source={xIcon} style={styles.btnIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnMatch]}
            onPress={handleAccept}
          >
            <Image source={matchIcon} style={styles.btnIcon} />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Nav */}
            <View style={styles.nav}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('home')}
              >
                <Image source={homeVacio} style={styles.navIcon} />
              </TouchableOpacity>
      
              {/* Corazón → Match */}
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('match')}
              >
                <Image source={matchFull} style={styles.navIcon} />
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('CreateProject')}
              >
                <Image source={plusIcon} style={styles.navIcon} />
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Image source={bellIcon} style={styles.navIcon} />
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('Profile')}
              >
                <Image source={profileIcon} style={styles.navIcon} />
              </TouchableOpacity>
            </View>
          </View>
  );
}

const { width, height } = Dimensions.get('window');
const CARD_W = width * 0.9;
const CARD_H = height * 0.6;

const styles = StyleSheet.create({
  /* tu estilo tal cual lo tenías */
  screen: {
    flex: 1,
    backgroundColor: '#170F24',
    alignItems: 'center',
  },
  /* … resto de estilos intactos … */
  header: {
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: '#FFF', fontSize: 20, fontWeight: '600' },
  headerIcon: { width: 24, height: 24, tintColor: '#888' },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1E1C2C',
    marginRight: 10,
  },
  tabActive: { backgroundColor: '#7B61FF' },
  tabText: { color: '#888', fontSize: 14 },
  tabTextActive: { color: '#FFF', fontWeight: '600' },
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardCategory: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  cardLabel: {
    color: '#7B61FF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  cardText: {
    color: '#DDD',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    textAlign: 'justify',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CARD_W * 0.6,
    marginVertical: 20,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnReject: { backgroundColor: '#3E3160' },
  btnMatch: { backgroundColor: '#7B61FF' },
  btnIcon: { width: 28, height: 28, tintColor: '#FFF' },
  matchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  matchText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  matchButton: {
    backgroundColor: '#7B61FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  matchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nav: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#1E1C2C',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#170F24',
    zIndex: 100,
  },
  navItem: { alignItems: 'center' },
  navIcon: { width: 24, height: 24, tintColor: '#888' },
});





