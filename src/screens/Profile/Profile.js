import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { auth, db } from '../../firebase/config';
import { useEffect, useState } from 'react';

function Profile(props) {
  const [user, setUser] = useState(null);
  const [misPosts, setMisPosts] = useState([]);

  function logOut() {
    auth.signOut()
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
        props.navigation.navigate("Login");
        return;
      }

      db.collection("users")
        .where("email", "==", firebaseUser.email)
        .onSnapshot(docs => {
          let usuario = null;

          docs.forEach(doc => {
            usuario = doc.data();
          });

          setUser(usuario);
        });

      db.collection("posts")
        .where("email", "==", firebaseUser.email)
        .orderBy("createdAt", "desc")
        .onSnapshot(docs => {
          let posteos = [];

          docs.forEach(doc => {
            posteos.push({
              id: doc.id,
              data: doc.data()
            });
          });

          setMisPosts(posteos);
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.texto}>{auth.currentUser ? auth.currentUser.email : ""}</Text>

      <Text style={styles.label}>Nombre de usuario:</Text>
      <Text style={styles.texto}>{user ? user.userName : ""}</Text>

      <Pressable style={styles.boton} onPress={() => logOut()}>
        <Text style={styles.textoBoton}>Desloguearse</Text>
      </Pressable>

      <Text style={styles.subtitulo}>Mis posteos</Text>

      <FlatList
        data={misPosts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postTexto}>{item.data.descripcionPost}</Text>
            <Text style={styles.likes}>Likes: {item.data.likes ? item.data.likes.length : 0}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.sinPosts}>Todavía no hiciste posteos.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    marginTop: 10,
  },

  texto: {
    fontSize: 16,
    marginBottom: 5,
  },

  boton: {
    backgroundColor: "#111",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  textoBoton: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  },

  subtitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  post: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  postTexto: {
    fontSize: 16,
    marginBottom: 8,
  },

  likes: {
    fontSize: 14,
    color: "#555",
  },

  sinPosts: {
    fontSize: 14,
    color: "#777",
    marginTop: 10,
  }
});

export default Profile;