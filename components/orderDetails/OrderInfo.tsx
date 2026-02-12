import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderInfo = ({ id, createdAt }: { id: string, createdAt: any }) => {
    const date = new Date(createdAt?.toDate?.() || createdAt).toDateString();

    return (
        <View style={styles.section}>
            <Text style={styles.orderIdLabel}>Order ID: #{id.slice(-6).toUpperCase()}</Text>
            <Text style={styles.dateText}>Placed on {date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    orderIdLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B'
    },
    dateText: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 4
    },
});

export default OrderInfo;