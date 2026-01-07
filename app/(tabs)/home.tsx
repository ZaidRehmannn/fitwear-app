import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const home = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.logo}>FitWear</Text>

                <View style={styles.headerActions}>
                    <Ionicons name="search-outline" size={28} color="#fff" />
                    <Ionicons name="menu-outline" size={28} color="#fff" />
                </View>
            </View>

            <View style={styles.content}>
                <Text>Product feed coming here</Text>
            </View>
        </SafeAreaView>
    )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B3B5D"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    logo: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    headerActions: {
        flexDirection: "row",
        gap: 16,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
});