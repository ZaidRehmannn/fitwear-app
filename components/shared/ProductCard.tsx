import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/services/productService";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product.id);

    const handleWishlistToggle = async (e: any) => {
        e.stopPropagation();
        await toggleWishlist(product.id);
    };

    return (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push(`/shop/product/${product.id}`)}
            activeOpacity={0.9}
        >
            <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />

                <TouchableOpacity
                    style={styles.wishlistButton}
                    onPress={handleWishlistToggle}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={18}
                        color={isFavorite ? "#ff4757" : colors.navy}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productName} numberOfLines={1}>
                    {product.title}
                </Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                </Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    productCard: {
        width: CARD_WIDTH,
        paddingBottom: 24,
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        marginBottom: 6,
    },
    productDescription: {
        fontSize: 12,
        color: colors.textMuted,
        lineHeight: 16,
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.navy,
    },
});