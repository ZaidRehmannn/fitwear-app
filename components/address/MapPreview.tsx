import { colors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';

interface Props {
    region: Region;
    onRegionChange: (region: Region) => void;
    onGetCurrentLocation: () => void;
}

const MapPreview = ({ region, onRegionChange, onGetCurrentLocation }: Props) => {
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (region && mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
        }
    }, [region.latitude, region.longitude]);

    return (
        <View style={styles.mapWrapper}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={onRegionChange}
                showsUserLocation={true}
                showsMyLocationButton={false}
                toolbarEnabled={false}
            />

            {/* Center Marker Pin */}
            <View style={styles.markerFixed} pointerEvents="none">
                <Ionicons name="location" size={40} color="#ff4757" />
                <View style={styles.markerShadow} />
            </View>

            {/* Floating GPS Button */}
            <TouchableOpacity
                style={styles.gpsButton}
                onPress={onGetCurrentLocation}
                activeOpacity={0.8}
            >
                <Ionicons name="locate" size={24} color={colors.navy} />
            </TouchableOpacity>
        </View>
    );
};

export default MapPreview;

const styles = StyleSheet.create({
    mapWrapper: {
        height: 250,
        margin: 20,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#E2E8F0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    map: {
        flex: 1
    },
    markerFixed: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerShadow: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: -2,
    },
    gpsButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: '#fff',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }
});