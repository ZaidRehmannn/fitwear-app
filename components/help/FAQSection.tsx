import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { faqs } from '../../utils/data/helpData';

const FAQSection = () => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Questions</Text>
        {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    section: {
        marginBottom: 25
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 15
    },
    faqItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    faqQuestion: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 5
    },
    faqAnswer: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18
    },
});

export default FAQSection;