import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AuthFooterProps {
    text: string;
    linkText: string;
    onPress: () => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ text, linkText, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>
                {text} <Text style={styles.link}>{linkText}</Text>
            </Text>
        </TouchableOpacity>
    );
};

export default AuthFooter;

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
    link: {
        color: "#00cfff",
        fontWeight: "bold",
    },
});
