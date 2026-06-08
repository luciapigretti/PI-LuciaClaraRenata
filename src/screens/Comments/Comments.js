import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { useState } from "react";

function DynamicForm(props) {

    const [comentario, setComentario] = useState("")

    function onSubmit() {
        console.log(comentario)
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titulo}>Dejá un comentario:</Text>

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder=' Comentario'
                    onChangeText={text => setComentario(text)}
                    value={comentario} />

                <Pressable onPress={() => onSubmit()} style={styles.boton}>
                    <Text style={styles.textoBoton}>Enviar</Text>
                </Pressable>
            </View>
            <View style={styles.textoBotonContenedor} >
                <Text style={styles.textoComentario} >Comentario: {comentario}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 20,
    },

    titulo: {
        fontSize: 30,
        textAlign: "center"
    },

    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderCurve: 6,
        marginVertical: 10,
    },

    botonLogin: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderCurve: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop: 10
    },

    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderCurve: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },

    textoBoton: {
        textAlign: "center",
        fontSize: 18,
        color: '#ffffffff',
        marginTop: 10,
        marginBottom: 10
    },

    textoComentario: {
        textAlign: "left",
        fontSize: 18,
        color: '#181818ff',
        marginTop: 10,
        marginBottom: 10
    },
    textoRegistroContenedor: {
        textAlign: "left",
        fontSize: 18,
        color: '#0e0d0dff',
        marginTop: 10
    }
})

export default DynamicForm;