import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ProductGrid from '@/components/shop/ProductGrid';
import EmptyWishlist from '@/components/wishlist/EmptyWishlist';
import WishlistHeader from '@/components/wishlist/WishlistHeader';
import { useWishlistProducts } from '@/hooks/useWishlistProducts';
import { colors } from '@/utils/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WishlistScreen = () => {
    const router = useRouter();
    const { products, loading } = useWishlistProducts();

    return (
        <SafeAreaView style={styles.container}>
            <WishlistHeader
                onBack={() => router.replace("/(tabs)/profile")}
                count={products.length}
            />

            {loading ? (
                <LoadingSpinner />
            ) : products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <EmptyWishlist />
            )}
        </SafeAreaView>
    );
};

export default WishlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background || "#fff",
    },
});