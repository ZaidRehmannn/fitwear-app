import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CategoryProps {
    categories: string[];
    onPressCategory: (category: string) => void;
}

const Categories: React.FC<CategoryProps> = ({ categories, onPressCategory }) => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    style={styles.categoryBtn}
                    onPress={() => onPressCategory(cat)}
                >
                    <Text style={styles.categoryText}>{cat}</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        paddingVertical: 8
    },
    categoryBtn: {
        backgroundColor: "#0D1B2A",
        paddingVertical: 14,
        marginRight: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderBottomColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    categoryText: {
        color: "#fff",
        fontWeight: "bold",
    },
});