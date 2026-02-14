import { PromoCode, getAllPromoCodes } from '@/services/promoService';
import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OfferListProps {
    onSelect: (code: string) => void;
    currentTotal: number;
    showFirstOrder: boolean;
}

const OfferList = ({ onSelect, currentTotal, showFirstOrder }: OfferListProps) => {
    const [offers, setOffers] = useState<PromoCode[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await getAllPromoCodes();
                setOffers(data);
            } catch (error) {
                console.error("Error fetching offers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    if (loading) {
        return <ActivityIndicator size="small" color={colors.navy} style={{ marginVertical: 20 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Available Offers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {offers.map((offer, index) => {
                    const isFirstOrderLocked = offer.isFirstOrderOnly && !showFirstOrder;
                    const isAmountLocked = currentTotal < offer.minAmount;
                    const isLocked = isFirstOrderLocked || isAmountLocked;

                    if (offer.isFirstOrderOnly && !showFirstOrder) return null;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, isLocked && styles.lockedCard]}
                            onPress={() => !isLocked && onSelect(offer.code)}
                            disabled={isLocked}
                            activeOpacity={0.7}
                        >
                            <View style={styles.topRow}>
                                <Text style={styles.offerTitle}>
                                    {offer.type === 'percentage' ? `${offer.value}% OFF` : `$${offer.value} OFF`}
                                </Text>
                                {isLocked && <Ionicons name="lock-closed" size={14} color="#94A3B8" />}
                            </View>

                            <Text style={styles.offerCode}>{offer.code}</Text>

                            <Text style={styles.offerDesc}>
                                {offer.isFirstOrderOnly
                                    ? 'New Customer Special'
                                    : `On orders above $${offer.minAmount}`}
                            </Text>

                            {isAmountLocked && !isFirstOrderLocked && (
                                <Text style={styles.neededText}>
                                    Add ${offer.minAmount - currentTotal} more
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default OfferList;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginHorizontal: 20,
        marginBottom: 12
    },
    scroll: {
        paddingHorizontal: 15
    },
    card: {
        backgroundColor: '#F0F9FF',
        borderWidth: 1,
        borderColor: '#BAE6FD',
        borderRadius: 16,
        padding: 14,
        width: 160,
        marginHorizontal: 6,
        borderStyle: 'dashed'
    },
    lockedCard: {
        backgroundColor: '#F1F5F9',
        borderColor: '#E2E8F0',
        opacity: 0.9
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    offerTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.navy
    },
    offerCode: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.cyan,
        backgroundColor: 'rgba(0, 190, 214, 0.1)',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
        marginVertical: 6
    },
    offerDesc: {
        fontSize: 10,
        color: '#64748B',
        lineHeight: 14
    },
    neededText: {
        fontSize: 9,
        fontWeight: '600',
        color: '#EF4444',
        marginTop: 6
    }
});