import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DeliveryInfoProps {
    address: string;
    paymentMethod: string;
}

const DeliveryInfo = ({ address, paymentMethod }: DeliveryInfoProps) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery & Payment</Text>

        <View style={styles.infoBox}>
            <Ionicons name="location" size={18} color={colors.navy} />
            <Text style={styles.infoText}>{address}</Text>
        </View>

        <View style={[styles.infoBox, { marginTop: 10 }]}>
            <Ionicons name="card" size={18} color={colors.navy} />
            <Text style={styles.infoText}>
                {paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod}
            </Text>
        </View>
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
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 10
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        color: '#475569'
    },
});

export default DeliveryInfo;