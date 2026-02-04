import OrderSummary from '@/components/cart/OrderSummary';
import CheckoutFooter from '@/components/checkout/CheckoutFooter';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import DeliverySection from '@/components/checkout/DeliverySection';
import PaymentSection from '@/components/checkout/PaymentSection';
import { db } from '@/config/firebase';
import { useCart } from "@/context/CartContext";
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Checkout = () => {
    const router = useRouter();
    const { cartItems, totals, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [address, setAddress] = useState("");

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) return;

        if (address.trim().length < 10) {
            Alert.alert("Invalid Address", "Please enter a complete delivery address.");
            return;
        }

        try {
            setLoading(true);
            const orderData = {
                items: cartItems,
                totalAmount: totals.subtotal + totals.shipping,
                paymentMethod,
                status: 'pending',
                createdAt: serverTimestamp(),
                deliveryAddress: address,
            };

            await addDoc(collection(db, "orders"), orderData);

            Alert.alert("Success!", "Order placed successfully!", [
                {
                    text: "OK", onPress: () => {
                        clearCart();
                        router.replace("/(tabs)/shop" as any);
                    }
                }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not place order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CheckoutHeader title="Review Order" onBack={() => router.back()} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <DeliverySection
                    address={address}
                    onAddressChange={(text: string) => setAddress(text)}
                />

                <PaymentSection
                    selectedMethod={paymentMethod}
                    onSelect={setPaymentMethod}
                />

                <OrderSummary totals={totals} isCheckout={true} />
            </ScrollView>

            <CheckoutFooter
                total={totals.subtotal + totals.shipping - totals.discount}
                onPress={handlePlaceOrder}
                loading={loading}
                disabled={cartItems.length === 0}
            />
        </SafeAreaView>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        padding: 20
    }
});