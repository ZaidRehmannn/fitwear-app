import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WishlistHeaderProps {
    onBack: () => void;
    count: number;
}

const WishlistHeader = ({ onBack, count }: WishlistHeaderProps) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary || "#1B3B5D"} />
        </TouchableOpacity>
        <Text style={styles.title}>My Wishlist</Text>
        <Text style={styles.count}>{count} Items</Text>
    </View>
);

export default WishlistHeader;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 23,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerBtn: {
        width: 44,
        height: 44,
        backgroundColor: colors.card || "#f5f5f5",
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary || "#1B3B5D",
    },
    count: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.cyan || "#00BCD4",
    },
});