import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface DeliverySectionProps {
    address: string;
    onAddressChange: (text: string) => void;
}

const DeliverySection = ({ address, onAddressChange }: DeliverySectionProps) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery to</Text>
        <View style={styles.card}>
            <Ionicons name="location" size={20} color={colors.navy} style={styles.icon} />

            <TextInput
                style={styles.input}
                value={address}
                onChangeText={onAddressChange}
                placeholder="Enter your full address..."
                placeholderTextColor="#94A3B8"
                multiline={true}
                numberOfLines={2}
                blurOnSubmit={true}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#1B3B5D'
    },
    card: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    icon: {
        marginTop: 2
    },
    input: {
        marginLeft: 10,
        flex: 1,
        color: '#475569',
        fontSize: 14,
        paddingTop: 0,
        minHeight: 40,
        textAlignVertical: 'top'
    },
});

export default DeliverySection;