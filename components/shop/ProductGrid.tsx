import { Product } from "@/services/productService";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "../shared/ProductCard";

interface ProductGridProps {
    products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    const renderProduct = ({ item }: { item: Product }) => (
        <ProductCard product={item} />
    );

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
            ListEmptyComponent={
                <View style={styles.emptyState}>
                    <Ionicons name="search" size={48} color="#ccc" />
                    <Text style={styles.emptyText}>No products found</Text>
                </View>
            }
        />
    );
};

export default ProductGrid;

const styles = StyleSheet.create({
    productsList: {
        paddingHorizontal: 23,
        paddingTop: 8,
        paddingBottom: 100,
    },
    row: {
        justifyContent: "space-between",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        marginTop: 12,
    },
});