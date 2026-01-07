import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AuthButtonProps {
    title: string;
    onPress: () => void;
    loading: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress, loading }) => {
    return (
        <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={onPress}
            disabled={loading}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default AuthButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#00cfff",
        marginTop: 32,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    text: {
        color: "#0D1B2A",
        fontSize: 18,
        fontWeight: "bold",
    },
});
