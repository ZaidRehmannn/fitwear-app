import { Product } from "@/services/productService";
import { colors } from "@/utils/theme";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native/";
import ProductCard from "../shared/ProductCard";

interface TrendingSectionProps {
    products: Product[];
}

const TrendingSection = ({ products }: TrendingSectionProps) => {
    const router = useRouter();
    const trendingProducts = products.slice(5, 9); // Just an example to get some products for the trending section

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionLabel}>FEATURED</Text>
                    <Text style={styles.sectionTitle}>Trending Now</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/shop")}>
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