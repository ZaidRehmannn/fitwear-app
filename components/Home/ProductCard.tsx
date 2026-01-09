import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ProductCardProps {
    name: string;
    price: string;
    image: string;
    onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name} numberOfLines={2}>
                {name}
            </Text>
            <Text style={styles.price}>{price}</Text>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 14,
        marginBottom: 16,
        overflow: "hidden",
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
    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
        backgroundColor: "#f2f2f2",
    },
    name: {
        marginTop: 8,
        marginHorizontal: 10,
        fontWeight: "600",
        fontSize: 16,
        color: "#1B1B1B",
    },
    price: {
        marginTop: 4,
        marginHorizontal: 10,
        marginBottom: 10,
        fontWeight: "500",
        fontSize: 14,
        color: "#555",
    },
});
