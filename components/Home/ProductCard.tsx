import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
    name: string;
    price: string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginBottom: 14,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 120,
        borderRadius: 10,
        backgroundColor: "#eee",
    },
    name: {
        marginTop: 8,
        fontWeight: "600",
        fontSize: 14,
    },
    price: {
        marginTop: 4,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
});
