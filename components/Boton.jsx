import { useEffect, useState } from "react";
import { TouchableOpacity, Link, Text, View, StyleSheet,Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = Math.min(width * 0.9, 320);


function Boton({link, textoLabel}){

    return(
<View>

<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonText}>{texto}</Text>
</TouchableOpacity>

</View>


    )
}

export default Boton;

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
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    mb: {
      marginBottom: 16,
    },
  });
  
  
  
  