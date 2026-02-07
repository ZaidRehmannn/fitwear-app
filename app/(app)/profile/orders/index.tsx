import EmptyList from '@/components/orders/EmptyList';
import OrderCard from '@/components/orders/OrderCard';
import OrderHeader from '@/components/orders/OrderHeader';
import { orderService } from '@/services/orderService';
import { colors } from '@/utils/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Order {
    id: string;
    createdAt: Date;
    items: any[];
    totalAmount: number;
    deliveryAddress: string;
    paymentMethod: string;
    [key: string]: any;
}

// testing

const OrdersScreen = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await orderService.getUserOrders();
            setOrders(data as Order[]);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <OrderHeader
                title="Order History"
                onBack={() => router.back()}
            />

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.navy} />
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => <OrderCard order={item} />}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyList />}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    listContent: {
        padding: 16,
        paddingBottom: 40
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;