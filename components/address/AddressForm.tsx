import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ADDRESS_TYPES = [
    { label: 'Home', icon: 'home-outline' },
    { label: 'Office', icon: 'briefcase-outline' },
    { label: 'Other', icon: 'location-outline' },
];

interface Props {
    selectedType: string;
    onTypeSelect: (type: string) => void;
    address: string;
    customName: string;
    setCustomName: (text: string) => void;
}

const AddressForm = ({ selectedType, onTypeSelect, address, customName, setCustomName }: Props) => (
    <View style={styles.content}>
        <Text style={styles.sectionLabel}>Select Address Type</Text>
        <View style={styles.typeRow}>
            {ADDRESS_TYPES.map((type) => (
                <TouchableOpacity
                    key={type.label}
                    style={[styles.typeBtn, selectedType === type.label && styles.typeBtnActive]}
                    onPress={() => onTypeSelect(type.label)}
                >
                    <Ionicons name={type.icon as any} size={20} color={selectedType === type.label ? '#fff' : colors.navy} />
                    <Text style={[styles.typeText, selectedType === type.label && styles.typeTextActive]}>{type.label}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <Text style={styles.sectionLabel}>Full Address</Text>
        <View style={styles.addressBox}>
            <Ionicons name="map-outline" size={20} color={colors.cyan} />
            <Text style={styles.addressText}>{address}</Text>
        </View>

        <Text style={styles.sectionLabel}>Additional Info (Optional)</Text>
        <TextInput
            style={styles.input}
            placeholder="Flat / Building / Landmark"
            value={customName}
            onChangeText={setCustomName}
            placeholderTextColor="#A0AEC0"
        />
    </View>
);

export default AddressForm;

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.navy,
        marginTop: 20,
        marginBottom: 10
    },
    typeRow: {
        flexDirection: 'row',
        gap: 10
    },
    typeBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    typeBtnActive: {
        backgroundColor: colors.navy,
        borderColor: colors.navy
    },
    typeText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.navy
    },
    typeTextActive: {
        color: '#fff'
    },
    addressBox: {
        flexDirection: 'row',
        gap: 10,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    addressText: {
        flex: 1,
        fontSize: 14,
        color: '#4A5568'
    },
    input: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        color: colors.navy
    },
});