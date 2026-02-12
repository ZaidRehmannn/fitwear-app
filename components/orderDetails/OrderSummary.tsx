import { colors } from '@/utils/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OrderSummaryProps {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    totalAmount: number;
}

const OrderSummaryBreakdown = ({ subtotal, deliveryFee, discount, totalAmount }: OrderSummaryProps) => (
    <View style={[styles.section, { marginBottom: 40 }]}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>${subtotal.toLocaleString()}</Text>
        </View>

        <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={[styles.billValue, deliveryFee === 0 && { color: '#10B981' }]}>
                {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toLocaleString()}`}
            </Text>
        </View>

        {discount > 0 && (
            <View style={styles.billRow}>
                <Text style={styles.billLabel}>Discount</Text>
                <Text style={[styles.billValue, { color: '#EF4444' }]}>
                    -${discount.toLocaleString()}
                </Text>
            </View>
        )}

        <View style={styles.divider} />

        <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${totalAmount.toLocaleString()}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 12
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    billLabel: {
        fontSize: 14,
        color: '#64748B'
    },
    billValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B'
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 8
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B'
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.navy
    },
});

export default OrderSummaryBreakdown;