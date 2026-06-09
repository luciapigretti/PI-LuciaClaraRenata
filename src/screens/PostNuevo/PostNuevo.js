import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { auth, db } from '../../firebase/Config';

function NuevoPost(){
    const [descripcionPost, setDescripcionPost] = useState('');
    function onSubmit(){
        db.collection('posts').add({
            email: auth.currentUser.email,
            descripcionPost: descripcionPost,
            createdAt: Date.now()
        })
        .then(() => {setDescripcionPost('')})
        .catch(error => {console.log(error)})
    }
  return(
    <View style={styles.container}>
    <Text style={styles.titulo}>NUEVO POST</Text>
    <TextInput
      style={styles.texto}
      keyboardType='default'
      placeholder='Escribí tu post'
      onChangeText={text => setDescripcionPost(text)}
      value={descripcionPost}
    />
    <Pressable onPress={() => onSubmit()} style={styles.boton}>
      <Text style={styles.textoBoton}>Publicar</Text>
    </Pressable>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20
  },

  titulo:{
    fontWeight:'bold',
    fontSize:35,
    marginBottom:30
  },

  texto:{
    width:'80%',
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:8,
    padding:12,
    marginBottom:20,
    minHeight:100
  },

  boton:{
    backgroundColor:'orange',
    width:'80%',
    padding:15,
    borderRadius:8
  },

  textoBoton:{
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default NuevoPost;