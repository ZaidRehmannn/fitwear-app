import LoadingSpinner from "@/components/shared/LoadingSpinner";
import CategoryFilter from "@/components/shop/CategoryFilter";
import ProductGrid from "@/components/shop/ProductGrid";
import SearchBar from "@/components/shop/SearchBar";
import ShopHeader from "@/components/shop/ShopHeader";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Shop = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { products, loading } = useProducts(selectedCategory);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <ShopHeader onCartPress={() => router.push("/cart")} />

                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onClear={() => setSearchQuery("")}
                />

                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    productCount={products.length}
                />

                {loading
                    ? <LoadingSpinner />
                    : <ProductGrid products={filteredProducts} />
                }

                {!loading && filteredProducts.length === 0 && (
                    <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
                        No products found
                    </Text>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default Shop;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});