import { capitalize } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryDropdownProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryDropdown = ({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryDropdownProps) => {
    return (
        <View style={styles.dropdownMenu}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category}
                    style={[
                        styles.dropdownItem,
                        selectedCategory === category && styles.dropdownItemActive,
                    ]}
                    onPress={() => onSelectCategory(category)}
                >
                    <Text
                        style={[
                            styles.dropdownItemText,
                            selectedCategory === category && styles.dropdownItemTextActive,
                        ]}
                    >
                        {capitalize(category)}
                    </Text>
                    {selectedCategory === category && (
                        <Ionicons name="checkmark" size={18} color="#00cfff" />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CategoryDropdown;

const styles = StyleSheet.create({
    dropdownMenu: {
        position: "absolute",
        top: 180,
        left: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 8,
        zIndex: 100,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    dropdownItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    dropdownItemActive: {
        backgroundColor: "#f0faff",
    },
    dropdownItemText: {
        fontSize: 15,
        color: "#333",
    },
    dropdownItemTextActive: {
        color: "#1B3B5D",
        fontWeight: "600",
    },
});