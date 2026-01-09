import { capitalize } from "@/utils/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProductInfoProps {
    title: string;
    price: number;
    category: string;
    description: string;
}

const ProductInfo = ({ title, price, category, description }: ProductInfoProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={styles.category}>{capitalize(category)}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default ProductInfo;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
    },
    name: {
        marginTop: 12,
        fontWeight: "600",
        fontSize: 20,
        color: "#1B1B1B",
    },
    price: {
        marginTop: 4,
        fontWeight: "500",
        fontSize: 16,
        color: "#555",
    },
    category: {
        marginTop: 2,
        fontSize: 14,
        fontStyle: "italic",
        color: "#1B3B5D",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#1B1B1B",
        lineHeight: 22,
    },
});