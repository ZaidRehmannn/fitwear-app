import ContactCard from '@/components/help/ContactCard';
import FAQSection from '@/components/help/FAQSection';
import HelpHeader from '@/components/help/HelpHeader';
import HelpIntro from '@/components/help/HelpIntro';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpScreen = () => {
    const router = useRouter();

    const handleEmailPress = () => {
        Linking.openURL('mailto:support@fitwear.com');
    };

    return (
        <SafeAreaView style={styles.container}>
            <HelpHeader onBack={() => router.back()} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <HelpIntro />
                <FAQSection />
                <ContactCard onEmailPress={handleEmailPress} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HelpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    content: {
        padding: 20
    }
});