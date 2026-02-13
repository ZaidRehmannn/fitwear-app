import DeliveryInfo from '@/components/orderDetails/DeliveryInfo';
import OrderDetailsHeader from '@/components/orderDetails/OrderDetailsHeader';
import OrderInfo from '@/components/orderDetails/OrderInfo';
import OrderItems from '@/components/orderDetails/OrderItems';
import OrderSummaryBreakdown from '@/components/orderDetails/OrderSummary';
import { orderService } from '@/services/orderService';
import { colors } from '@/utils/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderDetails = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const data = await orderService.getOrderById(id as string);
                setOrder(data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.navy} />
            </View>
        );
    }

    if (!order) return <View style={styles.center}><Text>Order not found!</Text></View>;

    return (
        <SafeAreaView style={styles.container}>
            <OrderDetailsHeader
                title="Order Details"
                onBack={() => router.back()}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <OrderInfo id={order.id} createdAt={order.createdAt} />

                <OrderItems items={order.items} />

                <DeliveryInfo
                    address={order.deliveryAddress}
                    paymentMethod={order.paymentMethod}
                />

                <OrderSummaryBreakdown
                    subtotal={order.subtotal}
                    deliveryFee={order.deliveryFee || 0}
                    discount={order.discount || 0}
                    totalAmount={order.totalAmount}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContent: {
        padding: 20
    },
});

export default OrderDetails;