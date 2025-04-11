// importacoes 
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Result from './result'; // componente para exibir o resultado do imc
import Classification from './Classification'; //exibir a classificacao do imc
import IdealWeight from './IdealWeight'; //  exibir o peso ideal
import React, { useState } from 'react';
import Title from './title'; // componente para exibir o titulo

// definicao do formimc
const FormIMC = () => {
    //armazena os valores de peso altura imc classificaca o peso ideal
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [imc, setImc] = useState(null);
    const [classification, setClassification] = useState('');
    const [pesoMin, setPesoMin] = useState('');
    const [pesoMax, setPesoMax] = useState('');

    //substitui vrrgulas por pontos
    const subVirgulaPorPonto = (texto) => {
        return texto.replace(/,/g, ".");
    };

    // funcao principal para calculo do imc
    const calcularIMC = () => {
        const pesoCorrigido = subVirgulaPorPonto(peso); 
        const alturaCorrigida = subVirgulaPorPonto(altura); 

        // verifica  os valores  validos e realiza o calculo do imc
        if (!isNaN(pesoCorrigido) && !isNaN(alturaCorrigida) && parseFloat(pesoCorrigido) > 0 && parseFloat(alturaCorrigida) > 0) {
            const alturaMetros = parseFloat(alturaCorrigida) / 100; // converte altura de cm para metros
            const imcCalculado = (parseFloat(pesoCorrigido) / (alturaMetros * alturaMetros)).toFixed(2); // calcula o imc com 2 casas decimais
            setImc(imcCalculado); // atualiza o estado do imc
            classificarIMC(imcCalculado); // classifica o imc calculado
            calcularPesosIdeais(alturaCorrigida); // calcula os pesos ideais com base na altura do individuo
        } else {
            alert('Por favor, insira valores válidos para peso e altura.'); // alerta caso os valores sejam invalidos
        }
    };

    // funcao para classificar o imc com base no valor calculado
    const classificarIMC = (imc) => {
        if (imc < 18.5) setClassification("Abaixo do peso");
        else if (imc >= 18.5 && imc < 24.9) setClassification("Peso normal");
        else if (imc >= 25 && imc < 29.9) setClassification("Sobrepeso");
        else if (imc >= 30 && imc < 34.9) setClassification("Obesidade grau 1");
        else if (imc >= 35 && imc < 39.9) setClassification("Obesidade grau 2");
        else if (imc >= 40) setClassification("Obesidade grau 3");
    };

    // funcao para calcular os pesos ideais com base na altura
    const calcularPesosIdeais = (alturaCorrigida) => {
        const alturaMetros = parseFloat(alturaCorrigida) / 100; 
        const pesoMinCalculado = (18.5 * (alturaMetros * alturaMetros)).toFixed(2); 
        const pesoMaxCalculado = (24.9 * (alturaMetros * alturaMetros)).toFixed(2); 
        setPesoMin(pesoMinCalculado); 
        setPesoMax(pesoMaxCalculado); 
    };

    // renderiza o componente
    return (
        <View style={styles.formContainer}>
            <Title/> {/*  título do formulario. */}
            <TextInput
                style={styles.input}
                placeholder="Peso (kg)" 
                keyboardType="numeric" 
                value={peso} 
                onChangeText={setPeso} 
            />
            <TextInput
                style={styles.input}
                placeholder="Altura (cm)" 
                keyboardType="numeric" 
                value={altura} 
                onChangeText={setAltura} 
            />
            <Button title="Calcular IMC" onPress={calcularIMC} /> {/* botao para calcular imc */}
            {imc && ( 
                <>
                    <Result imc={imc} /> {/*  resultado do imc */}
                    <Classification classification={classification} /> {/*  classificação do imc */}
                    <IdealWeight pesoMin={pesoMin} pesoMax={pesoMax} /> {/*  pesos ideais */}
                </>
            )}
        </View>
    );
};

// estilo do componente
const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "lightblue", 
        padding: 16, 
        borderRadius: 10, 
    },
    input: {
        height: 40, 
        borderColor: "gray", 
        borderWidth: 1, 
        marginBottom: 12, 
        paddingHorizontal: 8, 
        borderRadius: 5, 
    },
});

// Exporta 
export default FormIMC;