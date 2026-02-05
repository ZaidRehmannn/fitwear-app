import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderCard = ({ order }: { order: any }) => {
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

    return (
        <View style={styles.card}>
            <View style={styles.topSection}>
                <View style={styles.iconContainer}>
                    <Ionicons name="receipt" size={22} color={colors.navy} />
                </View>
                <View style={styles.mainInfo}>
                    <Text style={styles.orderId}>Order #{order.id.slice(-6).toUpperCase()}</Text>
                    <Text style={styles.dateTime}>{date} • {time}</Text>
                </View>
                <Text style={styles.price}>${order.totalAmount.toLocaleString()}</Text>
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
        </View>
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