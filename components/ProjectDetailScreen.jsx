// src/screens/ProjectDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = 80;

export default function ProjectDetailScreen({ route }) {
  const navigation = useNavigation();
  // Aquí recibirías el ID o datos del proyecto, pero como ejemplo los traemos directamente:
  const project = {
    id: '4',
    name: 'Game Jam Unity',
    published: '1 de mayo',
    ownerImage: require('../assets/images/DesarrolloJuegos.jpeg'),
    location: 'Desarrollo de Juegos',
    summary:
      'Buscamos programadores de C# y artistas 2D para un Game Jam de 48h. ¡Únete!',
    budgetLabel: 'Intercambio de conocimientos',
    budgetDetail: 'Trueque de habilidades',
    skills: ['Programador C#', 'Artista 2D', 'Animaciones 2D', 'Físicas Unity'],
    description:
      'Únete a un Game Jam de 48h para crear un minijuego. Compartiremos técnicas de optimización, físicas y animaciones 2D en Unity. Trabajaremos en equipo, revisaremos conceptos de diseño de niveles y control de versiones con Git.',
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del proyecto</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Título + Fecha */}
        <View style={styles.row}>
          <Text style={styles.projectLine} numberOfLines={1}>
            {project.name}
          </Text>
          <Text style={styles.published}>Publicado el {project.published}</Text>
        </View>

        {/* Imagen circular */}
        <Image
          source={project.ownerImage}
          style={styles.ownerImage}
        />

        {/* Nombre del proyecto y ubicación */}
        <Text style={styles.projectName}>{project.name}</Text>
        <Text style={styles.location}>{project.location}</Text>

        {/* Resumen breve */}
        <Text style={styles.summary}>{project.summary}</Text>

        {/* Presupuesto */}
        <Text style={styles.sectionTitle}>Presupuesto</Text>
        <Text style={styles.budgetLabel}>1.000.000 COP - 3.000.000 COP</Text>
       

        {/* Habilidades necesarias */}
        <Text style={styles.sectionTitle}>Habilidades necesarias</Text>
        <View style={styles.tagsContainer}>
          {project.skills.map((skill, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Descripción */}
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{project.description}</Text>
      </ScrollView>

      {/* Botón Postularme */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText}>Postularme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');
const FOOTER_HEIGHT = 80;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#170F24',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backIcon: {
    color: '#FFF',
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: FOOTER_HEIGHT + 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectLine: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  published: {
    color: '#AAA',
    fontSize: 12,
  },
  ownerImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginTop: 20,
    alignSelf: 'center',
  },
  projectName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
  location: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  summary: {
    color: '#DDD',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  budgetLabel: {
    color: '#DDD',
    fontSize: 14,
  },
  budgetDetail: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
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
  description: {
    color: '#DDD',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#170F24',
    borderTopColor: '#1E1C2C',
    borderTopWidth: 1,
  },
  applyButton: {
    backgroundColor: '#7B61FF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 60,
  },
  applyText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
