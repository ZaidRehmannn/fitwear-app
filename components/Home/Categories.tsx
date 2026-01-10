import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categories = [
    { id: 1, name: "Men", icon: "man-outline" },
    { id: 2, name: "Women", icon: "woman-outline" },
    { id: 3, name: "New", icon: "sparkles-outline" },
    { id: 4, name: "Sale", icon: "pricetag-outline" },
];

const Categories = () => {
    // const { categories, loading } = useCategories();

    return (
        <View style={styles.categoriesContainer}>
            {categories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryItem}>
                    <View style={styles.categoryIcon}>
                        <Ionicons name={category.icon as any} size={22} color={colors.navy} />
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    categoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    categoryItem: {
        alignItems: "center",
        gap: 8,
    },
    categoryIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.navy,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    categoryName: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.textPrimary,
    },
});