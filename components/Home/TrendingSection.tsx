import { colors } from "@/utils/theme";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native/";
import ProductCard from "../shared/ProductCard";

const trendingProducts = [
    {
        id: 1,
        name: "Classic Navy Shirt",
        price: "$49",
        category: "Shirts",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    },
    {
        id: 2,
        name: "Essential White Tee",
        price: "$29",
        category: "Basics",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    },
    {
        id: 3,
        name: "Slim Fit Trousers",
        price: "$79",
        category: "Pants",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
    },
];

const TrendingSection = () => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionLabel}>FEATURED</Text>
                    <Text style={styles.sectionTitle}>Trending Now</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
            >
                {trendingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ScrollView>
        </View>
    );
};

export default TrendingSection;

const styles = StyleSheet.create({
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.cyan,
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.textPrimary,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.navy,
    },
    productsContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },
});