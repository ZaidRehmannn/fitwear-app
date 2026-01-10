import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const PRODUCTS: Record<string, any> = {
    "1": {
        id: "1",
        name: "Classic Navy Tee",
        price: 39,
        category: "T-Shirts",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600",
        ],
        description: "Premium cotton t-shirt with a relaxed fit. Perfect for everyday wear with exceptional comfort and durability.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Navy", "White", "Black", "Grey"],
        details: [
            "100% Premium Cotton",
            "Relaxed fit",
            "Crew neck",
            "Machine washable",
        ],
    },
    // Add more products as needed
};

const ProductDetail = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const product = PRODUCTS[id || "1"] || PRODUCTS["1"];

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select size and color");
            return;
        }
        // Add to cart logic here
        alert(`Added ${quantity}x ${product.name} to cart!`);
        router.push("/cart");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                    <Feather name="arrow-left" size={24} color="#1B3B5D" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsWishlisted(!isWishlisted)}
                    style={styles.headerBtn}
                >
                    <Feather
                        name={isWishlisted ? "heart" : "heart"}
                        size={24}
                        color={isWishlisted ? "#ff4757" : "#1B3B5D"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image Gallery */}
                <View style={styles.imageGallery}>
                    <Image
                        source={{ uri: product.images[activeImage] }}
                        style={styles.mainImage}
                    />
                    <View style={styles.thumbnails}>
                        {product.images.map((img: string, index: number) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveImage(index)}
                                style={[
                                    styles.thumbnail,
                                    activeImage === index && styles.thumbnailActive,
                                ]}
                            >
                                <Image source={{ uri: img }} style={styles.thumbnailImage} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Size Selection */}
                    <View style={styles.optionSection}>
                        <Text style={styles.optionTitle}>Size</Text>
                        <View style={styles.optionRow}>
                            {product.sizes.map((size: string) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sizeBtn,
                                        selectedSize === size && styles.sizeBtnActive,
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text
                                        style={[
                                            styles.sizeBtnText,
                                            selectedSize === size && styles.sizeBtnTextActive,
                                        ]}
                                    >
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Color Selection */}
                    <View style={styles.optionSection}>
                        <Text style={styles.optionTitle}>Color</Text>
                        <View style={styles.optionRow}>
                            {product.colors.map((color: string) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorBtn,
                                        selectedColor === color && styles.colorBtnActive,
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                >
                                    <Text
                                        style={[
                                            styles.colorBtnText,
                                            selectedColor === color && styles.colorBtnTextActive,
                                        ]}
                                    >
                                        {color}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Quantity */}
                    <View style={styles.optionSection}>
                        <Text style={styles.optionTitle}>Quantity</Text>
                        <View style={styles.quantityRow}>
                            <TouchableOpacity
                                style={styles.quantityBtn}
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Feather name="minus" size={20} color="#1B3B5D" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity
                                style={styles.quantityBtn}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Feather name="plus" size={20} color="#1B3B5D" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Product Details */}
                    <View style={styles.detailsSection}>
                        <Text style={styles.optionTitle}>Details</Text>
                        {product.details.map((detail: string, index: number) => (
                            <View key={index} style={styles.detailRow}>
                                <Feather name="check" size={16} color="#00cfff" />
                                <Text style={styles.detailText}>{detail}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalPrice}>${product.price * quantity}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
                    <Feather name="shopping-bag" size={20} color="#0D1B2A" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    headerBtn: {
        width: 44,
        height: 44,
        backgroundColor: "#f5f5f5",
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    imageGallery: {
        backgroundColor: "#f8f8f8",
    },
    mainImage: {
        width: width,
        height: width,
    },
    thumbnails: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 16,
        gap: 12,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "transparent",
    },
    thumbnailActive: {
        borderColor: "#00cfff",
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
    },
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
    optionSection: {
        marginTop: 24,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1B3B5D",
        marginBottom: 12,
    },
    optionRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    sizeBtn: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#f5f5f5",
        minWidth: 50,
        alignItems: "center",
    },
    sizeBtnActive: {
        backgroundColor: "#1B3B5D",
    },
    sizeBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    sizeBtnTextActive: {
        color: "#fff",
    },
    colorBtn: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#f5f5f5",
    },
    colorBtnActive: {
        backgroundColor: "#1B3B5D",
    },
    colorBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    colorBtnTextActive: {
        color: "#fff",
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    quantityBtn: {
        width: 44,
        height: 44,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1B3B5D",
        minWidth: 30,
        textAlign: "center",
    },
    detailsSection: {
        marginTop: 24,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: "#666",
    },
    bottomBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        gap: 20,
    },
    totalSection: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 12,
        color: "#888",
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    addToCartBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#00cfff",
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 14,
        gap: 10,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0D1B2A",
    },
});
