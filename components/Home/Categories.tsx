import { useCategory } from "@/context/CategoryContext";
import { capitalize } from "@/utils/helpers";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categoryIcons: Record<string, string> = {
    "men's clothing": "man-outline",
    "women's clothing": "woman-outline",
    "electronics": "phone-portrait",
    "jewelery": "diamond-outline",
};

interface CategoriesProps {
    categories: string[];
}

const Categories = ({ categories }: CategoriesProps) => {
    const router = useRouter();
    const { setSelectedCategory } = useCategory();

    const onCategoryPress = (category: string) => {
        setSelectedCategory(category);
        router.push("/(tabs)/shop");
    };

    return (
        <View style={styles.categoriesContainer}>
            {categories.map((category) => {
                const iconName = categoryIcons[category] || "grid-outline";
                return (
                    <TouchableOpacity
                        key={category}
                        style={styles.categoryItem}
                        onPress={() => onCategoryPress(category)}
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name={iconName as any} size={22} color={colors.navy} />
                        </View>
                        <Text style={styles.categoryName}>{capitalize(category)}</Text>
                    </TouchableOpacity>
                )
            })}
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