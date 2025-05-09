import axios from "axios";
import { useEffect, useState } from "react";
import { Flatlist, Text, View } from "react-native";

function NombreUsuarios(){

    const [usuarios,setUsuarios]= useState ({});

    useEffect(function(){
        traerDatos();
    },[])
    function traerDatos(){
        const usuarios = axios("https://backend-app-huge.onrender.com/usuarios-todos")
        .then(function (res){
            console.log("Datos traidos de forma exitosa");
            if(res.data.status){
                setUsuarios(res.data.data);
            }

        })
        .catch(function(error){
            
        });
}

function item(data){
    return(

        <View>
            <Text>NombreCompleto:{data.NombreCompleto}</Text>
            <Text>CorreoElectronico:{data.CorreoElectronico}</Text>
            <Text>Rol{data.Rol}</Text>
        </View>
    )    
}
return(

    <View>
        <Flatlist
        
        data = {usuarios}
        renderItem= {item}


       />
       
    </View>
)    

}

export default NombreUsuarios;