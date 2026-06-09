import { Pressable, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/config';

function Home({ navigation }) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posteos = [];

        docs.forEach(doc => {
          posteos.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setPosts(posteos);
      });
  }, []);

  function comentar(post) {
    navigation.navigate('Comments', {
      postId: post.id,
      postData: post.data
    });
  }

  function likear(post) {
    const emailUsuario = auth.currentUser.email;
    const likesActuales = post.data.likes || [];

    if (likesActuales.includes(emailUsuario)) {
      const nuevosLikes = likesActuales.filter(email => email !== emailUsuario);

      db.collection('posts').doc(post.id).update({
        likes: nuevosLikes
      });
    } else {
      const nuevosLikes = [...likesActuales, emailUsuario];

      db.collection('posts').doc(post.id).update({
        likes: nuevosLikes
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>HOME</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const likes = item.data.likes || [];
          const usuarioLikeo = likes.includes(auth.currentUser.email);

          return (
            <View style={styles.post}>
              <Text style={styles.postEmail}>{item.data.email}</Text>
              <Text style={styles.postTexto}>{item.data.descripcionPost}</Text>

              <Text style={styles.cantidadLikes}>
                Likes: {likes.length}
              </Text>

              <View style={styles.botones}>
                <Pressable style={styles.botonEliminar} onPress={() => likear(item)}>
                  <Text style={styles.textoBoton}>
                    {usuarioLikeo ? 'Quitar like' : 'Me gusta'}
                  </Text>
                </Pressable>

                <Pressable style={styles.botonEliminar} onPress={() => comentar(item)}>
                  <Text style={styles.textoBoton}>Comentar</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
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
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20
  },

  email: {
    fontSize: 15,
    marginBottom: 25
  },

  subtitulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15
  },

  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },

  postEmail: {
    fontSize: 12,
    marginBottom: 5
  },

  postTexto: {
    fontSize: 16
  },

  cantidadLikes: {
    fontSize: 14,
    marginTop: 8
  },

  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  botonEliminar: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end'
  },

  boton: {
    backgroundColor: 'orange',
    width: '80%',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },

  textoBoton: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default Home;