import Categories from "@/components/home/Categories";
import FeaturesBanner from "@/components/home/FeaturesBanner";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import PromoBanner from "@/components/home/PromoBanner";
import TrendingSection from "@/components/home/TrendingSection";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { colors } from "@/utils/theme";
import { useRouter } from "expo-router";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const router = useRouter();
    const { categories, loading: categoriesLoading } = useCategories();
    const { products, loading: productsLoading } = useProducts("All");
    const isLoading = categoriesLoading || productsLoading;

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingSpinner />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header onCartPress={() => router.push("/(tabs)/cart")} />
                <HeroSection onShopPress={() => router.push("/(tabs)/shop")} />
                <Categories categories={categories} />
                <TrendingSection products={products} />
                <FeaturesBanner />
                <PromoBanner />
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    bottomSpacer: {
        height: 40,
    },
});