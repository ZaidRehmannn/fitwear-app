import React from "react";
import { Image, StyleSheet } from "react-native";

interface ProductImageProps {
    uri: string;
    alt?: string;
}

const ProductImage = ({ uri, alt }: ProductImageProps) => {
    return (
        <Image
            source={{ uri }}
            style={styles.image}
            accessibilityLabel={alt}
        />
    );
};

export default ProductImage;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
        backgroundColor: "#f2f2f2",
    },
});