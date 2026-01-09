import { useProducts } from "@/hooks/useProducts";
import { capitalize } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../LoadingSpinner";

interface ProductFeedProps {
    category: string | null;
}

const ProductFeed: React.FC<ProductFeedProps> = ({ category }) => {
    const { products, loading, error } = useProducts(category);
    const router = useRouter();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error)
        return <Text style={styles.error}>{error}</Text>;

    if (!products.length)
        return <Text style={styles.error}>No products found</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>
                {category ? capitalize(category) : "All Products"}
            </Text>

            <View style={styles.separator} />

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <ProductCard
                        name={item.title}
                        price={`$${item.price}`}
                        image={item.image}
                        onPress={() => router.push(`/home/product/${item.id}`)}
                    />
                )}
            />
        </View>
    );
};

export default ProductFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
    list: {
        paddingBottom: 120,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        textAlign: "center",
        marginTop: 20,
        color: "#D9534F",
        fontSize: 16,
    },
    categoryTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1B3B5D",
        marginBottom: 6,
        marginLeft: 4,
    },
    separator: {
        height: 1,
        backgroundColor: "#1B3B5D",
        marginBottom: 12,
        marginHorizontal: 4,
    },
});
