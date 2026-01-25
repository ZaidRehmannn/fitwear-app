import BottomBar from "@/components/productDetail/BottomBar";
import ImageGallery from "@/components/productDetail/ImageGallery";
import ProductHeader from "@/components/productDetail/ProductHeader";
import ProductInfo from "@/components/productDetail/ProductInfo";
import QuantitySelector from "@/components/productDetail/QuantitySelector";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProduct } from "@/hooks/useProduct";
import { showToast } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetail = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const { product, loading, error } = useProduct(id);
    const { addToCart } = useCart();

    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(id as string);

    useEffect(() => {
        setQuantity(1);
        setAdded(false);
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !product) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.errorText}>
                    {error ?? "Product not found"}
                </Text>
            </SafeAreaView>
        );
    }

    const handleAddToCart = () => {
        showToast('success', `Added ${quantity}x ${product.title} to cart!`);
        addToCart(product, quantity);
        setAdded(true);
    };

    const handleToggleWishlist = async () => {
        try {
            await toggleWishlist(product.id);
            const status = !isWishlisted ? "added to" : "removed from";
            showToast('success', `${product.title} ${status} wishlist`);
        } catch (err) {
            showToast('error', "Could not update wishlist");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProductHeader
                onBack={() => router.replace("/shop")}
                isWishlisted={isWishlisted}
                onToggleWishlist={handleToggleWishlist}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageGallery
                    image={product.image}
                    category={product.category}
                />

                <ProductInfo
                    category={product.category}
                    name={product.title}
                    price={product.price}
                    description={product.description}
                />

                <QuantitySelector
                    quantity={quantity}
                    onIncrement={() => setQuantity(quantity + 1)}
                    onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={added}
                />

                <BottomBar
                    totalPrice={product.price * quantity}
                    onAddToCart={handleAddToCart}
                    disabled={added}
                />

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bottomSpacer: {
        height: 70,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    errorText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#444",
    },
});