import React from "react";
import { Text, StyleSheet } from "react-native";

const Result = ({ classification }) => { //  mensagem de acordo com a classificacao dada
    return (
        <Text style={styles.resultText}>Sua classificação é: {classification}</Text>
    );
};

const styles = StyleSheet.create({ //jeito da mensagem
    resultText: {
        marginTop: 20,
        fontSize: 30,
        textAlign: "center",
        color: "black",
    },
});

export default Result; //exporta o  result