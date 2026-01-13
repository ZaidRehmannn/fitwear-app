import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

interface ImageGalleryProps {
    image: string;
    category: string;
}

const ImageGallery = ({ image, category }: ImageGalleryProps) => {
    const router = useRouter();
    const { products } = useProducts(category);

    const relatedProducts = products
        .filter((p) => p.image !== image)
        .slice(0, 3);

    return (
        <View style={styles.container}>
            {/* Main Product Image */}
            <Image source={{ uri: image }} style={styles.mainImage} resizeMode="cover" />

            {/* Images for related products */}
            <View style={styles.thumbnailsContainer}>
                {relatedProducts.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        onPress={() => router.push(`/shop/product/${product.id}`)}
                        style={styles.thumbnailWrapper}
                    >
                        <Image
                            source={{ uri: product.image }}
                            style={styles.thumbnailImage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ImageGallery;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f8f8",
        paddingBottom: 16,
    },
    mainImage: {
        width: width,
        height: width,
    },
    thumbnailsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        marginTop: 12,
    },
    thumbnailWrapper: {
        width: 70,
        height: 70,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "transparent",
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
    },
});
