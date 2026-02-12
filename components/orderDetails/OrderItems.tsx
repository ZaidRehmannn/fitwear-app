import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const OrderItems = ({ items }: { items: any[] }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items Ordered</Text>
        {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toLocaleString()}</Text>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 12
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F1F5F9'
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155'
    },
    itemQty: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B'
    },
});

export default OrderItems;