import { colors } from '@/utils/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CheckoutFooterProps {
    total: number;
    onPress: () => void;
    loading: boolean;
    disabled: boolean;
}

const CheckoutFooter = ({ total, onPress, loading, disabled }: CheckoutFooterProps) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={[styles.confirmBtn, (loading || disabled) && { opacity: 0.7 }]}
                onPress={onPress}
                disabled={loading || disabled}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.confirmBtnText}>
                        Place Order (${total.toFixed(2)})
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        backgroundColor: '#fff'
    },
    confirmBtn: {
        backgroundColor: colors.navy,
        padding: 18,
        borderRadius: 15,
        alignItems: 'center'
    },
    confirmBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default CheckoutFooter;