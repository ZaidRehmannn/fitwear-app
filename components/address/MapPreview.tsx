import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';

interface Props {
    region: Region;
    onRegionChange: (region: Region) => void;
}

const MapPreview = ({ region, onRegionChange }: Props) => (
    <View style={styles.mapWrapper}>
        <MapView
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={onRegionChange}
            showsUserLocation
        />
        <View style={styles.markerFixed} pointerEvents="none">
            <Ionicons name="location" size={40} color="#ff4757" />
        </View>
    </View>
);

export default MapPreview;

const styles = StyleSheet.create({
    mapWrapper: {
        height: 250,
        margin: 20,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 4
    },
    map: {
        flex: 1
    },
    markerFixed: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -38
    },
});