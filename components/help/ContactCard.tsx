import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onEmailPress: () => void;
}

const ContactCard = ({ onEmailPress }: Props) => (
    <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Still need help?</Text>
        <Text style={styles.contactText}>
            Our support team is available Monday to Friday (9 AM - 6 PM).
        </Text>

        <TouchableOpacity
            style={styles.emailButton}
            onPress={onEmailPress}
            activeOpacity={0.8}
        >
            <Ionicons name="mail" size={20} color={colors.navy} style={styles.buttonIcon} />
            <Text style={styles.emailButtonText}>Email Support</Text>
        </TouchableOpacity>

        <Text style={styles.emailAddress}>support@fitwear.com</Text>
    </View>
);

const styles = StyleSheet.create({
    contactCard: {
        backgroundColor: colors.navy,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        marginTop: 10,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10
    },
    contactText: {
        fontSize: 13,
        color: '#CBD5E1',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20
    },
    emailButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '80%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        position: 'relative',
    },
    buttonIcon: {
        position: 'absolute',
        left: 20
    },
    emailButtonText: {
        color: colors.navy,
        fontWeight: '700',
        fontSize: 15
    },
    emailAddress: {
        color: '#94A3B8',
        fontSize: 12
    }
});

export default ContactCard;