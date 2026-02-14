import CartHeader from "@/components/cart/CartHeader";
import CartItemList from "@/components/cart/CartItemList";
import CheckoutBar from "@/components/cart/CheckoutBar";
import EmptyCart from "@/components/cart/EmptyCart";
import OfferList from "@/components/cart/OfferList";
import OrderSummary from "@/components/cart/OrderSummary";
import PromoCodeSection from "@/components/cart/PromoCodeSection";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { usePromoCode } from "@/hooks/usePromoCode";
import { orderService } from "@/services/orderService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { cartItems, totals } = useCart();
    const { applyCode, removeCode, loading, error, success } = usePromoCode();
    const [eligibleForFirstOrder, setEligibleForFirstOrder] = useState(false);
    const [selectedCode, setSelectedCode] = useState("");

    const handleSelectOffer = (code: string) => {
        setSelectedCode(code);
        applyCode(code);
    };

    useEffect(() => {
        const checkFirstOrder = async () => {
            if (user) {
                const isEligible = await orderService.isFirstOrder(user.uid);
                setEligibleForFirstOrder(isEligible);
            }
        };
        checkFirstOrder();
    }, [user]);

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

                        <OfferList
                            onSelect={handleSelectOffer}
                            showFirstOrder={eligibleForFirstOrder}
                            currentTotal={totals.subtotal}
                        />

                        <PromoCodeSection
                            onApply={applyCode}
                            onRemove={removeCode}
                            externalCode={selectedCode}
                            loading={loading}
                            error={error}
                            success={success}
                        />

                        <OrderSummary totals={totals} />
                    </ScrollView>

                    <CheckoutBar onCheckout={() => router.push("/(app)/checkout" as any)} />
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
