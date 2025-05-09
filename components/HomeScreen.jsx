// src/screens/CommunityScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ← AQUÍ: repite los imports de tus icons existentes
import homeIcon from '../assets/images/home.png';
import matchIcon from '../assets/images/Match.png';
import plusIcon from '../assets/images/plus.png';
import bellIcon from '../assets/images/bellIcon.png';
import profileIcon from '../assets/images/profile.png';
// Para el chat (arréglalo en tu carpeta de assets/images)
import chatIcon from '../assets/images/chatIcon.png';
import matchFull from '../assets/images/MatchFull.png';
// Imágenes de proyectos que ya tienes
const MAIN_IMAGE = require('../assets/images/DesarrolloMovil.jpeg');
const HIGHLIGHT_1 = require('../assets/images/CienciaDatos.jpeg');
const HIGHLIGHT_2 = require('../assets/images/DesarrolloJuegos.jpeg');

const tags = ['Data science', 'NLP', 'Python', 'Kaggle'];
const highlights = [
  {
    id: 'h1',
    image: HIGHLIGHT_1,
    title: 'Data Science con Python',
    subtitle: 'Ultima actualizacion hace: 2h',
  },
  {
    id: 'h2',
    image: HIGHLIGHT_2,
    title: 'Game Jam Unity',
    subtitle: 'Ultima actualizacion hace:                5 min',
  },
];
const events = [
  { id: 'e1', title: 'Frontend', detail: 'Mayo 20 · Bogotá, DC' },
  { id: 'e2', title: 'Arduino',        detail: 'Mayo 22 · Bogotá, DC' },
  { id: 'e3', title: 'Reunion Unity',        detail: 'Mayo 22 · Bogotá, DC' },
];

const { width } = Dimensions.get('window');
const NAV_HEIGHT = 60;

export default function CommunityScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: NAV_HEIGHT + 20 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>LinkUp</Text>
          <TouchableOpacity>
            <Image source={chatIcon} style={styles.chatIcon} />
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <Text style={styles.projectTitle}>
          Proyecto del mes
        </Text>

        {/* Imagen principal */}
        <Image source={MAIN_IMAGE} style={styles.mainImage} />

        {/* Título y datos */}
        <Text style={styles.projectTitle}>
          App Reactive Native
        </Text>
        <Text style={styles.byline}>Desarrollo Movil</Text>
        <Text style={styles.members}>Por Juan Neuta</Text>

        {/* Highlights */}
        <Text style={styles.sectionTitle}>Historial</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.highlightsScroll}
        >
          {highlights.map((h, i) => (
            <View
              key={h.id}
              style={[
                styles.highlightCard,
                i === highlights.length - 1 && { marginRight: 20 },
              ]}
            >
              <Image source={h.image} style={styles.highlightImage} />
              <Text style={styles.highlightTitle}>{h.title}</Text>
              <Text style={styles.highlightSubtitle}>{h.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Upcoming Events */}
        <Text style={styles.sectionTitle}>Tareas pendientes</Text>
        {events.map(e => (
          <View key={e.id} style={styles.eventItem}>
            <View style={styles.eventBullet} />
            <View>
              <Text style={styles.eventTitle}>{e.title}</Text>
              <Text style={styles.eventDetail}>{e.detail}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('home')}
        >
          <Image source={homeIcon} style={styles.navIcon} />
        </TouchableOpacity>

        {/* Corazón → Match */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('match')}
        >
          <Image source={matchIcon} style={styles.navIcon} />
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

const IMAGE_WIDTH = width - 40;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.6;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#170F24',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  chatIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  tag: {
    backgroundColor: '#1E1C2C',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
  },

  mainImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 16,
  },
  projectTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  byline: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 4,
    paddingHorizontal: 20,
  },
  members: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 2,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 20,
  },

  highlightsScroll: {
    paddingLeft: 20,
  },
  highlightCard: {
    width: 160,
    marginRight: 12,
  },
  highlightImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  highlightTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  highlightSubtitle: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 4,
  },

  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  eventBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7B61FF',
    marginRight: 12,
  },
  eventTitle: {
    color: '#FFF',
    fontSize: 14,
  },
  eventDetail: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 2,
  },

  nav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: NAV_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E1C2C',
    backgroundColor: '#170F24',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
  },
});

