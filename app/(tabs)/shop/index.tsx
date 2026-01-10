import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = ["All", "T-Shirts", "Shirts", "Pants", "Jackets", "Accessories"];

const PRODUCTS = [
    { id: "1", name: "Classic Navy Tee", price: 39, category: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300" },
    { id: "2", name: "Slim Fit Chinos", price: 69, category: "Pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300" },
    { id: "3", name: "Oxford Button-Down", price: 59, category: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300" },
    { id: "4", name: "Leather Belt", price: 45, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" },
    { id: "5", name: "Bomber Jacket", price: 129, category: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300" },
    { id: "6", name: "Premium Hoodie", price: 79, category: "T-Shirts", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300" },
    { id: "7", name: "Denim Jacket", price: 99, category: "Jackets", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300" },
    { id: "8", name: "Canvas Sneakers", price: 89, category: "Accessories", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300" },
];

const Shop = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const renderProduct = ({ item }: { item: typeof PRODUCTS[0] }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push(`shop/product/${item.id}`)}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistBtn}>
                    <Feather name="heart" size={18} color="#1B3B5D" />
                </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{item.category}</Text>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Shop</Text>
                <TouchableOpacity onPress={() => router.push("/cart")}>
                    <Feather name="shopping-bag" size={24} color="#1B3B5D" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Feather name="x" size={20} color="#888" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Category Dropdown */}
            <View style={styles.filterRow}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowDropdown(!showDropdown)}
                >
                    <Text style={styles.dropdownText}>{selectedCategory}</Text>
                    <Feather name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#1B3B5D" />
                </TouchableOpacity>
                <Text style={styles.resultCount}>{filteredProducts.length} products</Text>
            </View>

            {/* Dropdown Menu */}
            {showDropdown && (
                <View style={styles.dropdownMenu}>
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.dropdownItem,
                                selectedCategory === category && styles.dropdownItemActive,
                            ]}
                            onPress={() => {
                                setSelectedCategory(category);
                                setShowDropdown(false);
                            }}
                        >
                            <Text
                                style={[
                                    styles.dropdownItemText,
                                    selectedCategory === category && styles.dropdownItemTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                            {selectedCategory === category && (
                                <Feather name="check" size={18} color="#00cfff" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Products Grid */}
            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productsList}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Feather name="search" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>No products found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default Shop;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#1B3B5D",
    },
    filterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 16,
        marginBottom: 8,
        zIndex: 10,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
    },
    dropdownText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1B3B5D",
    },
    resultCount: {
        fontSize: 14,
        color: "#888",
    },
    dropdownMenu: {
        position: "absolute",
        top: 180,
        left: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 8,
        zIndex: 100,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    dropdownItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    dropdownItemActive: {
        backgroundColor: "#f0faff",
    },
    dropdownItemText: {
        fontSize: 15,
        color: "#333",
    },
    dropdownItemTextActive: {
        color: "#1B3B5D",
        fontWeight: "600",
    },
    productsList: {
        paddingHorizontal: 14,
        paddingTop: 8,
        paddingBottom: 100,
    },
    row: {
        justifyContent: "space-between",
    },
    productCard: {
        width: "48%",
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#1B3B5D",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    imageContainer: {
        position: "relative",
    },
    productImage: {
        width: "100%",
        height: 180,
        backgroundColor: "#f5f5f5",
    },
    wishlistBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productInfo: {
        padding: 12,
    },
    productCategory: {
        fontSize: 11,
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 4,
    },
    productName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1B3B5D",
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00cfff",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        marginTop: 12,
    },
});
