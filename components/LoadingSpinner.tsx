import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingSpinner = () => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#1B3B5D" />
        </View>
    );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});