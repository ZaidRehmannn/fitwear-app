import LoadingSpinner from "@/components/LoadingSpinner";
import AddToCartButton from "@/components/ProductDetails/AddtoCartButton";
import ProductCard from "@/components/ProductDetails/ProductCard";
import ProductHeader from "@/components/ProductDetails/ProductHeader";
import { useProduct } from "@/hooks/useProduct";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ProductDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { product, loading, error } = useProduct(id ?? null);

    const handleAddToCart = () => {
        console.log(`Added ${product?.title} to cart`);
        // Add your cart logic here
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !product) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error || "Product not found"}</Text>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <ProductHeader />

            <ScrollView contentContainerStyle={styles.container}>
                <ProductCard product={product} />
            </ScrollView>

            <AddToCartButton
                onPress={handleAddToCart}
                productTitle={product.title}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        padding: 12,
        paddingBottom: 100,
        alignItems: "center",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        fontSize: 16,
        color: "#D9534F",
    },
});

export default ProductDetail;