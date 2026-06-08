import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import Login from "../Login/Login";
import { auth, db } from '../../firebase/config';
import { useEffect, useState } from 'react';

function Profile(props) {

    const [user, setUser] = useState("")

    function logOut(){
        auth.signOut()
        props.navigation.navigate("Login")
    }

    useEffect(
        () => {
            auth.onAuthStateChanged(
                firebaseUser => {
                    if (!firebaseUser ) {
                        props.navigation.navigate("Login")
                        return
                    }
                    db.collection("users").where("email", "==", firebaseUser.email).onSnapshot(
                        docs => {
                            let usuario = ""
                            docs.forEach(doc => {
                                usuario = doc.data()
                            })
                            setUser(usuario)
                        }
                    )
                }
            )
        },
        []
    )

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Perfil</Text>
            <Text>{auth.currentUser.email}</Text>
            {user ? <Text>{user.username}</Text> : <Text></Text>}
            <Pressable style={styles.boton} onPress={() => logOut()}>
                <Text style={styles.textoBoton}>Desloguearse</Text>
            </Pressable>
        </View>
    );
};

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

    boton: {
        backgroundColor: "#111",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        marginBottom: 16,
    },

    textoBoton: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15
    }
})

export default Profile;