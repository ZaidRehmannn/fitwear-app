import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CategoryProps {
    categories?: string[]; // optional default categories
    onPressCategory?: (category: string) => void; // callback when pressed
}

const Categories: React.FC<CategoryProps> = ({
    categories = ["Men", "Women", "Children"], // default categories
    onPressCategory,
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        >
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    style={styles.categoryBtn}
                    onPress={() => onPressCategory && onPressCategory(cat)}
                >
                    <Text style={styles.categoryText}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Categories;

const styles = StyleSheet.create({
    categoryBtn: {
        backgroundColor: "#0D1B2A",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
        borderWidth: 1,
        borderColor: "#00cfff",
    },
    categoryText: {
        color: "#00cfff",
        fontWeight: "bold",
    },
});
