import { useCategory } from "@/context/CategoryContext";
import { useCategories } from "@/hooks/useCategories";
import { capitalize } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CategoryDropdown from "./CategoryDropdown";

interface CategoryFilterProps {
    productCount: number;
}

const CategoryFilter = ({ productCount }: CategoryFilterProps) => {
    const { categories } = useCategories();
    const { selectedCategory, setSelectedCategory } = useCategory();
    const [showDropdown, setShowDropdown] = useState(false);
    const finalCategories = ["All", ...categories];

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setShowDropdown(false);
    };

    return (
        <>
            <View style={styles.filterRow}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowDropdown(!showDropdown)}
                >
                    <Text style={styles.dropdownText}>{capitalize(selectedCategory)}</Text>
                    <Ionicons
                        name={showDropdown ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#1B3B5D"
                    />
                </TouchableOpacity>
                <Text style={styles.resultCount}>{productCount} products</Text>
            </View>

            {showDropdown && (
                <CategoryDropdown
                    categories={finalCategories}
                    onSelectCategory={handleSelectCategory}
                />
            )}
        </>
    );
};

export default CategoryFilter;

const styles = StyleSheet.create({
    filterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 16,
        marginBottom: 8,
        zIndex: 10,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
    },
    dropdownText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1B3B5D",
    },
    resultCount: {
        fontSize: 14,
        color: "#888",
    },
});