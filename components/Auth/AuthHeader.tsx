import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
};

export default AuthHeader;

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        color: "#f0f0f0",
        marginTop: 8,
        textAlign: "center",
    },
});
