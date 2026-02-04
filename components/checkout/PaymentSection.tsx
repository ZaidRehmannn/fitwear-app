import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    selectedMethod: string;
    onSelect: (method: string) => void;
}

const PaymentSection = ({ selectedMethod, onSelect }: Props) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity
            style={[styles.paymentBtn, selectedMethod === 'COD' && styles.activePayment]}
            onPress={() => onSelect('COD')}
        >
            <Ionicons name="cash-outline" size={20} color={selectedMethod === 'COD' ? colors.navy : '#666'} />
            <Text style={styles.paymentBtnText}>Cash on Delivery</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    paymentBtn: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center'
    },
    activePayment: {
        borderColor: colors.navy,
        backgroundColor: '#F0F4FF'
    },
    paymentBtnText: {
        marginLeft: 10,
        fontWeight: '500'
    },
});

export default PaymentSection;