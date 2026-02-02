import AddressForm from '@/components/address/AddressForm';
import AddressHeader from '@/components/address/AddressHeader';
import MapPreview from '@/components/address/MapPreview';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { colors } from '@/utils/theme';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddressPicker = () => {
    const router = useRouter();
    const [region, setRegion] = useState<any>(null);
    const [address, setAddress] = useState("Locating...");
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('Home');
    const [customName, setCustomName] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const initial = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
            setRegion(initial);
            fetchAddress(initial.latitude, initial.longitude);
            setLoading(false);
        })();
    }, []);

    const fetchAddress = async (lat: number, lng: number) => {
        let response = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
        if (response.length > 0) {
            const item = response[0];
            setAddress(`${item.name || ''} ${item.street || ''}, ${item.city || ''}`);
        }
    };

    const handleConfirm = () => {
        // Yahan baad mein Firestore ka save logic aayega
        console.log({
            type: selectedType,
            address,
            info: customName,
            coords: region
        });
        router.back();
    };

    if (loading) return <LoadingSpinner />;

    return (
        <SafeAreaView style={styles.container}>
            <AddressHeader
                title="Add New Address"
                onBack={() => router.replace("/(tabs)/profile")}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {region && (
                        <MapPreview
                            region={region}
                            onRegionChange={(r) => fetchAddress(r.latitude, r.longitude)}
                        />
                    )}

                    <AddressForm
                        selectedType={selectedType}
                        onTypeSelect={setSelectedType}
                        address={address}
                        customName={customName}
                        setCustomName={setCustomName}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                    <Text style={styles.confirmBtnText}>Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AddressPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    scrollContent: {
        paddingBottom: 40
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingBottom: Platform.OS === 'ios' ? 30 : 20
    },
    confirmBtn: {
        backgroundColor: colors.navy,
        padding: 18,
        borderRadius: 16,
        alignItems: 'center'
    },
    confirmBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});