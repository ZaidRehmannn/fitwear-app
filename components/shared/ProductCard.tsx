import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;

interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <TouchableOpacity style={styles.productCard}>
            <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistButton}>
                    <Ionicons name="heart-outline" size={18} color={colors.navy} />
                </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    productCard: {
        width: CARD_WIDTH,
        marginRight: 16,
    },
    productImageContainer: {
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: colors.card,
    },
    productImage: {
        width: "100%",
        height: CARD_WIDTH * 1.25,
        resizeMode: "cover",
    },
    wishlistButton: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        alignItems: "center",
        justifyContent: "center",
    },
    productInfo: {
        paddingTop: 12,
    },
    productCategory: {
        fontSize: 11,
        fontWeight: "600",
        color: colors.textMuted,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        marginBottom: 4,
    },
    productName: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.textPrimary,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.navy,
    },
});