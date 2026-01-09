import { useProducts } from "@/hooks/useProducts";
import { FlatList, StyleSheet, Text } from "react-native";
import ProductCard from "./ProductCard";

interface ProductFeedProps {
    category: string | null;
}

const ProductFeed: React.FC<ProductFeedProps> = ({ category }) => {
    const { products, loading, error } = useProducts(category);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!products.length) return <Text>No products found</Text>;

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <ProductCard name={item.title} price={`$${item.price}`} image={item.image} />
            )}
        />
    );
};

export default ProductFeed;

const styles = StyleSheet.create({
    list: {
        paddingBottom: 120
    },
    row: {
        justifyContent: "space-between"
    },
});
