import CategoryDropdown from '@/components/Home/CategoryDropdown';
import Header from '@/components/Home/Header';
import ProductFeed from '@/components/Home/ProductFeed';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const home = () => {
    const [openCategory, setopenCategory] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    const insets = useSafeAreaInsets();
    const totalTopHeight = insets.top + headerHeight;

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView
                style={styles.headerContainer}
                edges={['top']}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setHeaderHeight(height - insets.top);
                }}
            >
                <Header
                    openCategory={openCategory}
                    setopenCategory={setopenCategory}
                />
            </SafeAreaView>

            {/* Category Dropdown with Overlay */}
            <CategoryDropdown
                isOpen={openCategory}
                onClose={() => setopenCategory(false)}
                topOffset={totalTopHeight}
            />

            {/* Product Feed */}
            <View style={styles.content}>
                <ProductFeed />
            </View>
        </View>
    );
};

export default home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B3B5D",
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1B3B5D",
        zIndex: 1000,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        paddingTop: 120,
        color: "black"
    },
});