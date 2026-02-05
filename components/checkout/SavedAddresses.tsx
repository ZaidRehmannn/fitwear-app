import { colors } from '@/utils/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SavedAddressesProps {
    addresses: any[];
    onSelect: (address: any) => void;
}

const SavedAddresses = ({ addresses, onSelect }: SavedAddressesProps) => {
    if (addresses.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Quick Select Saved Address:</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.chipScroll}
                contentContainerStyle={{ paddingRight: 20 }}
            >
                {addresses.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.chip}
                        onPress={() => onSelect(item)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.chipText} numberOfLines={1}>
                            {item.house}, {item.area}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 10,
        fontWeight: '600',
    },
    chipScroll: {
        flexDirection: 'row',
    },
    chip: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        maxWidth: 200,
    },
    chipText: {
        fontSize: 12,
        color: colors.navy,
        fontWeight: '500',
    },
});

export default SavedAddresses;