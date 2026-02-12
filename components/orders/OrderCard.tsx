import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OrderCard = ({ order }: { order: any }) => {
    const router = useRouter();

    const dateObj = new Date(order.createdAt);
    const date = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const time = dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const handlePress = () => {
        router.push(`/(app)/profile/orders/order/${order.id}` as any);
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.topSection}>
                <View style={styles.iconContainer}>
                    <Ionicons name="receipt" size={22} color={colors.navy} />
                </View>
                <View style={styles.mainInfo}>
                    <Text style={styles.orderId}>Order #{order.id.slice(-6).toUpperCase()}</Text>
                    <Text style={styles.dateTime}>{date} • {time}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${order.totalAmount.toLocaleString()}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={{ marginLeft: 4 }} />
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.bottomSection}>
                <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={14} color="#64748B" />
                    <Text style={styles.addressText} numberOfLines={1}>
                        {order.deliveryAddress}
                    </Text>
                </View>

                <View style={[styles.detailRow, { marginTop: 6 }]}>
                    <Ionicons name="cart-outline" size={14} color="#64748B" />
                    <Text style={styles.itemCount}>
                        {order.items.length} {order.items.length > 1 ? 'Items' : 'Item'} ordered
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default OrderCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainInfo: {
        flex: 1,
        marginLeft: 12
    },
    orderId: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B'
    },
    dateTime: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.navy
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 12
    },
    bottomSection: {
        paddingTop: 4
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressText: {
        flex: 1,
        marginLeft: 6,
        fontSize: 13,
        color: '#64748B'
    },
    itemCount: {
        marginLeft: 6,
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500'
    }
});