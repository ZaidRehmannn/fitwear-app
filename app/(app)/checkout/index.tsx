import OrderSummary from '@/components/cart/OrderSummary';
import CheckoutFooter from '@/components/checkout/CheckoutFooter';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import DeliverySection from '@/components/checkout/DeliverySection';
import PaymentSection from '@/components/checkout/PaymentSection';
import SavedAddresses from '@/components/checkout/SavedAddresses';
import { useCart } from "@/context/CartContext";
import { useCheckout } from '@/hooks/useCheckout';
import { orderService } from '@/services/orderService';
import { showToast } from '@/utils/toast'; // Toast utility
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Checkout = () => {
    const router = useRouter();
    const { cartItems, totals, clearCart } = useCart();
    const { savedAddresses, refreshAddresses } = useCheckout();

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [saveAddress, setSaveAddress] = useState(false);
    const [addressDetails, setAddressDetails] = useState({
        house: '',
        area: '',
        city: 'Karachi'
    });

    const updateAddressField = (field: string, value: string) => {
        setAddressDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleSelectSavedAddress = (item: any) => {
        setAddressDetails({ house: item.house, area: item.area, city: item.city });
    };

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) return;

        const { house, area, city } = addressDetails;
        if (!house.trim() || !area.trim() || !city.trim()) {
            return showToast('error', 'Please fill all address fields.');
        }

        try {
            setLoading(true);
            if (saveAddress) {
                await orderService.saveNewAddress(addressDetails);
                refreshAddresses();
            }

            const orderData = {
                items: cartItems,
                totalAmount: totals.subtotal + totals.shipping - totals.discount,
                paymentMethod,
                deliveryAddress: `${house}, ${area}, ${city}`,
            };

            await orderService.placeOrder(orderData);
            showToast('success', 'Order placed successfully! Redirecting...');
            clearCart();
            setTimeout(() => {
                router.replace("/(tabs)/home" as any);
            }, 2000);

        } catch (error) {
            console.error(error);
            showToast('error', 'Could not place order. Please try again.');
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
                <SavedAddresses
                    addresses={savedAddresses}
                    onSelect={handleSelectSavedAddress}
                />

                <DeliverySection
                    addressDetails={addressDetails}
                    onUpdateField={updateAddressField}
                    saveAddress={saveAddress}
                    onToggleSave={setSaveAddress}
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
                disabled={cartItems.length === 0 || loading}
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