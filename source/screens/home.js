import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default function Home(props) {
  const [posteos, setPosteos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setPosteos(posts);
        setLoading(false);
      });
  }, []);

  function darLike(postId, likes) {
    const usuarioActual = auth.currentUser.email;
    const yaLikeo = likes.includes(usuarioActual);

    db.collection('posts')
      .doc(postId)
      .update({
        likes: yaLikeo
          ? firebase.firestore.FieldValue.arrayRemove(usuarioActual)
          : firebase.firestore.FieldValue.arrayUnion(usuarioActual)
      });
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (loading) {
  return (
    <View style={styles.center}>
      <Text>Cargando...</Text>
    </View>
  );
}

if (posteos.length === 0) {
  return (
    <View style={styles.center}>
      <Text>No hay posteos aún</Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <FlatList
        data={posteos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.owner}>{item.data.owner}</Text>
            <Text style={styles.description}>{item.data.description}</Text>

            <View style={styles.actions}>
              <Pressable onPress={() => darLike(item.id, item.data.likes || [])}>
                <Text style={styles.like}>
                  {(item.data.likes || []).includes(auth.currentUser.email)
                    ? '❤️'
                    : '🤍'}{' '}
                  {(item.data.likes || []).length}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  props.navigation.navigate('Comments', { postId: item.id })
                }
              >
                <Text style={styles.comentar}>💬 Comentar</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  owner: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  like: {
    fontSize: 16,
  },
  comentar: {
    fontSize: 16,
    color: '#555',
  },
});