import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    selectedType: string;
    onTypeSelect: (type: string) => void;
    address: string;
    customName: string;
    setCustomName: (text: string) => void;
    onLocationSelect: (data: any, details: any) => void;
}

const AddressForm = ({
    selectedType,
    onTypeSelect,
    address,
    customName,
    setCustomName,
    onLocationSelect
}: Props) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const searchLocation = async (text: string) => {
        setSearchText(text);
        if (text.length < 3) {
            setSearchResults([]);
            return;
        }

        setSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&addressdetails=1&limit=5`,
                { headers: { 'User-Agent': 'fit_wear_app' } }
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setSearching(false);
        }
    };

    const handleSelect = (item: any) => {
        const details = {
            geometry: {
                location: {
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lon),
                }
            }
        };
        const data = { description: item.display_name };

        onLocationSelect(data, details);
        setSearchResults([]);
        setSearchText('');

        Keyboard.dismiss();
    };

    return (
        <View style={styles.content}>
            <Text style={styles.sectionLabel}>Search Location</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search area or street..."
                    value={searchText}
                    onChangeText={searchLocation}
                    placeholderTextColor="#A0AEC0"
                    returnKeyType="search"
                    onSubmitEditing={Keyboard.dismiss}
                />
                {searching && <ActivityIndicator style={styles.loader} color={colors.cyan} />}
            </View>

            {searchResults.length > 0 && (
                <View style={styles.suggestionList}>
                    {searchResults.map((item: any, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.resultItem}
                            onPress={() => handleSelect(item)}
                        >
                            <Ionicons name="location-outline" size={18} color={colors.navy} />
                            <Text style={styles.resultText} numberOfLines={2}>{item.display_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.sectionLabel}>Select Address Type</Text>
            <View style={styles.typeRow}>
                {['Home', 'Office', 'Other'].map((label) => (
                    <TouchableOpacity
                        key={label}
                        style={[styles.typeBtn, selectedType === label && styles.typeBtnActive]}
                        onPress={() => onTypeSelect(label)}
                    >
                        <Text style={[styles.typeText, selectedType === label && styles.typeTextActive]}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionLabel}>Selected Address</Text>
            <View style={styles.addressBox}>
                <Text style={styles.addressText}>{address}</Text>
            </View>

            <Text style={styles.sectionLabel}>Building / Flat No.</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter details..."
                value={customName}
                onChangeText={setCustomName}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
            />
        </View>
    );
};

export default AddressForm;

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        zIndex: 10
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.navy,
        marginTop: 20,
        marginBottom: 10
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    loader: {
        position: 'absolute',
        right: 15
    },
    suggestionList: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        maxHeight: 200,
        overflow: 'hidden'
    },
    resultItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        alignItems: 'center',
        gap: 10
    },
    resultText: {
        fontSize: 13,
        color: '#4A5568',
        flex: 1
    },
    typeRow: {
        flexDirection: 'row',
        gap: 10
    },
    typeBtn: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center'
    },
    typeBtnActive: {
        backgroundColor: colors.navy,
        borderColor: colors.navy
    },
    typeText: {
        fontWeight: '600',
        color: colors.navy
    },
    typeTextActive: {
        color: '#fff'
    },
    addressBox: {
        padding: 16,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    addressText: {
        fontSize: 14,
        color: '#4A5568'
    },
});