import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';

interface DeliverySectionProps {
    addressDetails: {
        house: string;
        area: string;
        city: string;
    };
    onUpdateField: (field: string, value: string) => void;
    saveAddress: boolean;
    onToggleSave: (value: boolean) => void;
}

const DeliverySection = ({ addressDetails, onUpdateField, saveAddress, onToggleSave }: DeliverySectionProps) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>

        <View style={styles.card}>
            <View style={styles.inputGroup}>
                <Ionicons name="home-outline" size={18} color={colors.navy} />
                <TextInput
                    style={styles.input}
                    value={addressDetails.house}
                    onChangeText={(val) => onUpdateField('house', val)}
                    placeholder="Flat / House No. / Building"
                    placeholderTextColor="#94A3B8"
                />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputGroup}>
                <Ionicons name="map-outline" size={18} color={colors.navy} />
                <TextInput
                    style={styles.input}
                    value={addressDetails.area}
                    onChangeText={(val) => onUpdateField('area', val)}
                    placeholder="Area / Colony / Street"
                    placeholderTextColor="#94A3B8"
                />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputGroup}>
                <Ionicons name="business-outline" size={18} color={colors.navy} />
                <TextInput
                    style={styles.input}
                    value={addressDetails.city}
                    onChangeText={(val) => onUpdateField('city', val)}
                    placeholder="City"
                    placeholderTextColor="#94A3B8"
                />
            </View>
        </View>

        <View style={styles.saveContainer}>
            <Text style={styles.saveText}>Save this address for future orders</Text>
            <View style={styles.switch}>
                <Switch
                    value={saveAddress}
                    onValueChange={onToggleSave}
                    trackColor={{ false: "#cbd5e1", true: colors.navy }}
                    ios_backgroundColor="#f1f5f9"
                />
            </View>
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
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden'
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 50,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#475569',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 12,
    },
    saveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 5
    },
    saveText: {
        fontSize: 13,
        color: '#64748b'
    },
    switch: {
        borderWidth: 1,
        borderColor: '#7f8388',
        borderRadius: 16,
        padding: 2
    }
});

export default DeliverySection;