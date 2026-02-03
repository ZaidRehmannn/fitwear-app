import AddressForm from '@/components/address/AddressForm';
import AddressHeader from '@/components/address/AddressHeader';
import MapPreview from '@/components/address/MapPreview';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { colors } from '@/utils/theme';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
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
        getCurrentLocation(true);
    }, []);

    const getCurrentLocation = async (isInitial = false) => {
        try {
            if (isInitial) setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Allow location access to select your address.');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            const newRegion = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };

            setRegion(newRegion);
            await fetchAddress(newRegion.latitude, newRegion.longitude);
        } catch (error) {
            console.error("Error getting location:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddress = async (lat: number, lng: number) => {
        try {
            let response = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
            if (response.length > 0) {
                const item = response[0];
                const formattedAddress = [
                    item.name,
                    item.street,
                    item.district,
                    item.city
                ].filter(Boolean).join(', ');
                setAddress(formattedAddress || "Unknown Location");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    const handleRegionChange = (newRegion: any) => {
        setRegion(newRegion);
        fetchAddress(newRegion.latitude, newRegion.longitude);
    };

    const handleLocationSelect = (data: any, details: any) => {
        if (details && details.geometry) {
            const selectedRegion = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
            setRegion(selectedRegion);
            setAddress(data.description);
        }
    };

    const handleConfirm = () => {
        const finalData = {
            type: selectedType,
            address: address,
            additionalInfo: customName,
            coords: { lat: region.latitude, lng: region.longitude }
        };
        console.log("Saving Address:", finalData);
        router.back();
    };

    if (loading) return <LoadingSpinner />;

    return (
        <SafeAreaView style={styles.container}>
            <AddressHeader
                title="Add New Address"
                onBack={() => router.replace("/(tabs)/profile")}
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {region && (
                            <MapPreview
                                region={region}
                                onRegionChange={handleRegionChange}
                                onGetCurrentLocation={() => getCurrentLocation(false)}
                            />
                        )}

                        <AddressForm
                            selectedType={selectedType}
                            onTypeSelect={onTypeSelectUpdate}
                            address={address}
                            customName={customName}
                            setCustomName={setCustomName}
                            onLocationSelect={handleLocationSelect}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                    <Text style={styles.confirmBtnText}>Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    function onTypeSelectUpdate(type: string) {
        setSelectedType(type);
        Keyboard.dismiss();
    }
};

export default AddressPicker;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    scrollContent: { paddingBottom: 40 },
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
        alignItems: 'center',
        elevation: 2,
    },
    confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});