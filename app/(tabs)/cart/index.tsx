import CartHeader from "@/components/cart/CartHeader";
import CartItemList from "@/components/cart/CartItemList";
import CheckoutBar from "@/components/cart/CheckoutBar";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";
import PromoCodeSection from "@/components/cart/PromoCodeSection";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
    const router = useRouter();
    const { cartItems } = useCart();

    return (
        <SafeAreaView style={styles.container}>
            <CartHeader
                itemCount={cartItems.length}
            />

            {cartItems.length === 0 ? (
                <EmptyCart onShopNow={() => router.push("/(tabs)/shop")} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        <CartItemList
                            items={cartItems}
                        />

                        <PromoCodeSection onApply={(code) => console.log("Apply:", code)} />

                        <OrderSummary />
                    </ScrollView>

                    <CheckoutBar onCheckout={() => console.log("Checkout")} />
                    <View style={styles.bottomSpacer} />
                </>
            )}
        </SafeAreaView>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        flex: 1,
    },
    bottomSpacer: {
        height: 50,
    },
});
