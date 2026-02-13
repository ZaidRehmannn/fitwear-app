import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onBack: () => void;
}

const HelpHeader = ({ onBack }: Props) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B'
    },
});

export default HelpHeader;