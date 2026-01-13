import { StyleSheet, Text, View } from "react-native";

interface ProductInfoProps {
    category: string;
    name: string;
    price: number;
    description: string;
}

const ProductInfo = ({ category, name, price, description }: ProductInfoProps) => {
    return (
        <View style={styles.productInfo}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default ProductInfo;

const styles = StyleSheet.create({
    productInfo: {
        padding: 24,
    },
    category: {
        fontSize: 12,
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: 1.5,
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1B3B5D",
        marginTop: 4,
    },
    price: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00cfff",
        marginTop: 8,
    },
    description: {
        fontSize: 15,
        color: "#666",
        lineHeight: 24,
        marginTop: 16,
    },
});