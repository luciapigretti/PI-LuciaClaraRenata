import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config';

function Comments({ route }) {
  const { postId, postData } = route.params;

  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();

          if (data.comments) {
            setComentarios(data.comments);
          } else {
            setComentarios([]);
          }
        }
      });
  }, []);

  function onSubmit() {
    if (comentario === '') {
      alert('Escribí un comentario');
      return;
    }

    const nuevoComentario = {
      email: auth.currentUser.email,
      texto: comentario,
      createdAt: Date.now()
    };

    const nuevosComentarios = [...comentarios, nuevoComentario];

    db.collection('posts')
      .doc(postId)
      .update({
        comments: nuevosComentarios
      })
      .then(() => {
        setComentario('');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comentarios</Text>

      <View style={styles.post}>
        <Text style={styles.email}>{postData.email}</Text>
        <Text style={styles.descripcion}>{postData.descripcionPost}</Text>
      </View>

      <TextInput
        style={styles.texto}
        keyboardType='default'
        placeholder='Escribí tu comentario'
        onChangeText={text => setComentario(text)}
        value={comentario}
      />

      <Pressable onPress={() => onSubmit()} style={styles.boton}>
        <Text style={styles.textoBoton}>Enviar comentario</Text>
      </Pressable>

      <FlatList
        data={comentarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.comentario}>
            <Text style={styles.emailComentario}>{item.email}</Text>
            <Text>{item.texto}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 30
  },

  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20
  },

  email: {
    fontSize: 12,
    marginBottom: 5
  },

  descripcion: {
    fontSize: 16
  },

  texto: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20
  },

  boton: {
    backgroundColor: '#57B8E8',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20
  },

  textoBoton: {
    textAlign: 'center',
    fontWeight: 'bold'
  },

  comentario: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10
  },

  emailComentario: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3
  }
});

export default Comments;