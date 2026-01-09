import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AddToCartButtonProps {
    onPress: () => void;
    productTitle: string;
}

const AddToCartButton = ({ onPress, productTitle }: AddToCartButtonProps) => {
    return (
        <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AddToCartButton;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#fff",
    },
    button: {
        marginHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#1B3B5D",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});