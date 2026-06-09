import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";

function RegisterScreen(props) {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(false)
    const [errorRegistro, setRegisterError] = useState("")

  function onSubmit(){
        console.log("CLICK REGISTER")
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log("USUARIO CREADO")
            db.collection('users').add({
                email: auth.currentUser.email,
                userName: userName,
                createdAt: Date.now()
            })
            .then(() => {
                 console.log("DOCUMENTO GUARDADO")
                setRegister(true);
                props.navigation.navigate("Login");
            })
        .catch(error => console. log ("ERROR FIRESTORE", error))
    })
        .catch (error => { console.log("ERROR AUTH", error); setRegisterError('Fallo en el registro.')})
    }

    useEffect(
        () => {
          auth.onAuthStateChanged(
            user => {
              if (user) {
                props.navigation.navigate("HomeMenu")
              }
            }
          )
        },
        []
      )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THREAD</Text>
      <Text style={styles.subtitle}>Creá tu cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorRegistro !== "" && <Text style={styles.error}>{errorRegistro}</Text>}

      <Pressable style={styles.btn} onPress={() => onSubmit()}>
  <Text style={styles.btnText}>Registrarse</Text>
</Pressable>

      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    justifyContent: "center", 
    padding: 32 
  },

  title: { 
    fontSize: 40, 
    fontWeight: "900", 
    letterSpacing: 4, 
    textAlign: "center", 
    marginBottom: 4 
  },
  
  subtitle: { 
    fontSize: 16, 
    color: "#666", 
    textAlign: "center", 
    marginBottom: 32 
  },
  
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    padding: 14, 
    marginBottom: 14, 
    fontSize: 15, 
    color: "#111" 
  },
  
  btn: { 
    backgroundColor: "#111", 
    borderRadius: 8, 
    padding: 16, 
    alignItems: "center", 
    marginBottom: 16 
  },
  
  btnText: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 15 
  },
  
  link: { 
    textAlign: "center", 
    color: "#555", 
    textDecorationLine: "underline" 
  },
  
  error: { 
    color: "red", 
    marginBottom: 10, 
    textAlign: "center" 
  },
});

export default RegisterScreen;