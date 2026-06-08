import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth } from "../../firebase/config";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(email, password) {
    console.log("CLICK LOGIN")
    if (!email.includes("@")) {
      setLoginError("Email mal formateado");
      alert("Email mal formateado")
      return
    }

    if (password.length < 6) {
      setLoginError("La password debe tener una longitud mínima de 6 caracteres");
      alert("La password debe tener una longitud mínima de 6 caracteres")
      return
    }

    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        setLogin(true);
        props.navigation.navigate("HomeMenu")
      })
      .catch(error => { console.log(error); setLoginError("Credenciales inválidas.") })
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
      <Text style={styles.subtitle}>Iniciá sesión</Text>

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

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.btn} onPress={() => onSubmit(email, password)}>
        <Text style={styles.btnText}>Ingresar</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Register")}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
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

export default LoginScreen;