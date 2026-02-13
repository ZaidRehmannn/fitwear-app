import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HelpIntro = () => (
    <View style={styles.introSection}>
        <View style={styles.iconCircle}>
            <Ionicons name="chatbubbles-outline" size={32} color={colors.navy} />
        </View>
        <Text style={styles.title}>How can we help you?</Text>
        <Text style={styles.subtitle}>
            We're here to assist you with any questions or issues regarding your orders.
        </Text>
    </View>
);

const styles = StyleSheet.create({
    introSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 8
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20
    },
});

export default HelpIntro;