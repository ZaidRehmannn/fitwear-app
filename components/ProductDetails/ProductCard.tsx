import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet } from "react-native";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

interface Product {
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <ProductImage uri={product.image} alt={product.title} />
            <ProductInfo
                title={product.title}
                price={product.price}
                category={product.category}
                description={product.description}
            />
        </Animated.View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        paddingBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
});