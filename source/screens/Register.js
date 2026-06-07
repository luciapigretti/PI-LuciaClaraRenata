import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

export default function RegisterScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users").add({ email: email, username: username });
        props.navigation.navigate("Login");
      })
      .catch((e) => setError(e.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THREAD</Text>
      <Text style={styles.subtitle}>Creá tu cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
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

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.btn} onPress={register}>
        <Text style={styles.btnText}>Registrarse</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", padding: 32 },
  title: { fontSize: 40, fontWeight: "900", letterSpacing: 4, textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 32 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 15, color: "#111" },
  btn: { backgroundColor: "#111", borderRadius: 8, padding: 16, alignItems: "center", marginBottom: 16 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  link: { textAlign: "center", color: "#555", textDecorationLine: "underline" },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});