import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
    toggleCategory: () => void;
    resetCategory: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCategory, resetCategory }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo} onPress={resetCategory}>FitWear</Text>
            <View style={styles.actions}>
                <TouchableOpacity style={{ marginRight: 16 }}>
                    <Ionicons name="search-outline" size={28} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleCategory()}>
                    <Ionicons name="menu-outline" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#1B3B5D",
    },
    logo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },
    actions: {
        flexDirection: "row",
    },
});